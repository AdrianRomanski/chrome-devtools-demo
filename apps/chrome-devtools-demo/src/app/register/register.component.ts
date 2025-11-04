import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  showSuccessMessage = false;
  showUserInfo = false;
  userId: number | null = null;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]],
    });
  }

  passwordValidator(control: any) {
    if (!control.value) {
      return null;
    }
    const password = control.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (!hasUpperCase || !hasSpecialChar || !hasNumber) {
      return { passwordComplexity: true };
    }
    return null;
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  getEmailErrorMessage(): string {
    if (this.email?.hasError('required')) {
      return 'Email is required';
    }
    if (this.email?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    return '';
  }

  getPasswordErrorMessage(): string {
    if (this.password?.hasError('required')) {
      return 'Password is required';
    }
    if (this.password?.hasError('passwordComplexity')) {
      return 'Password must contain at least 1 uppercase letter, 1 special character, and 1 number';
    }
    return '';
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.errorMessage = '';
      const { email, password } = this.registerForm.value;

      this.http.post<{ id: number; email: string; name?: string; createdAt: Date }>(
        'http://localhost:3000/api/register',
        { email, password }
      ).subscribe({
        next: (response) => {
          // Hide form
          this.registerForm.reset();
          
          // Show success message
          this.showSuccessMessage = true;
          this.userId = response.id;

          // After 5 seconds, hide success message and show user info
          setTimeout(() => {
            this.showSuccessMessage = false;
            this.showUserInfo = true;

            // Redirect after showing user info
            setTimeout(() => {
              this.router.navigate(['/anime']);
            }, 2000);
          }, 5000);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 409) {
            this.errorMessage = 'User with this email already exists';
          } else {
            this.errorMessage = 'Registration failed. Please try again.';
          }
        },
      });
    }
  }
}

