import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { inject } from '@angular/core';

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  
  protected readonly isSubmitting = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  
  protected readonly loginForm = new FormGroup<LoginForm>({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });
  
  protected onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    
    this.isSubmitting.set(true);
    this.errorMessage.set(null);
    
    const formValue = this.loginForm.getRawValue();
    
    this.http.post('http://localhost:3000/api/login', formValue)
      .subscribe({
        next: () => {
          this.isSubmitting.set(false);
          // Redirect to welcome or dashboard on success
          this.router.navigate(['/welcome']);
        },
        error: () => {
          this.isSubmitting.set(false);
          this.errorMessage.set('Wrong credentials');
        }
      });
  }
  
  protected getEmailError(): string | null {
    const control = this.loginForm.controls.email;
    if (control.hasError('required') && control.touched) {
      return 'Email is required';
    }
    if (control.hasError('email') && control.touched) {
      return 'Please enter a valid email address';
    }
    return null;
  }
  
  protected getPasswordError(): string | null {
    const control = this.loginForm.controls.password;
    if (control.hasError('required') && control.touched) {
      return 'Password is required';
    }
    return null;
  }
}
