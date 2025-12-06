import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

interface RegisterForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  
  protected readonly isSubmitting = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly successMessage = signal<string | null>(null);
  
  protected readonly registerForm = new FormGroup<RegisterForm>({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(8),
        this.passwordValidator
      ]
    })
  });
  
  private passwordValidator(control: FormControl<string>) {
    const value = control.value;
    if (!value) return null;
    
    const hasUpperCase = /[A-Z]/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
    
    const errors: { [key: string]: boolean } = {};
    
    if (!hasUpperCase) {
      errors['noUpperCase'] = true;
    }
    
    if (!hasSpecialChar) {
      errors['noSpecialChar'] = true;
    }
    
    return Object.keys(errors).length > 0 ? errors : null;
  }
  
  protected onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    
    this.isSubmitting.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);
    
    const formValue = this.registerForm.getRawValue();
    
    this.http.post('http://localhost:3000/api/register', formValue)
      .subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.successMessage.set('Registration successful! Redirecting to login...');
          setTimeout(() => {
            this.router.navigate(['/welcome']);
          }, 2000);
        },
        error: (error) => {
          this.isSubmitting.set(false);
          this.errorMessage.set(error.error?.message || 'Registration failed. Please try again.');
        }
      });
  }
  
  protected getEmailError(): string | null {
    const control = this.registerForm.controls.email;
    if (control.hasError('required') && control.touched) {
      return 'Email is required';
    }
    if (control.hasError('email') && control.touched) {
      return 'Please enter a valid email address';
    }
    return null;
  }
  
  protected getPasswordError(): string | null {
    const control = this.registerForm.controls.password;
    if (control.hasError('required') && control.touched) {
      return 'Password is required';
    }
    if (control.hasError('minLength') && control.touched) {
      return 'Password must be at least 8 characters long';
    }
    if (control.hasError('noUpperCase') && control.touched) {
      return 'Password must contain at least one uppercase letter';
    }
    if (control.hasError('noSpecialChar') && control.touched) {
      return 'Password must contain at least one special character';
    }
    return null;
  }
}
