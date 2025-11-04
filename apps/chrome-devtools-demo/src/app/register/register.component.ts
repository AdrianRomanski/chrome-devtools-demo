import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface RegisterResponse {
  id: number;
  email: string;
  name?: string;
  createdAt: Date;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);

  registerForm: FormGroup;
  errorMessage: string = '';
  showSuccessMessage: boolean = false;
  showUserMessage: boolean = false;
  userId: number | null = null;
  showForm: boolean = true;

  constructor() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          this.passwordValidator.bind(this),
        ],
      ],
    });
  }

  passwordValidator(control: any) {
    if (!control.value) {
      return null;
    }
    const value = control.value;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const hasNumber = /[0-9]/.test(value);

    if (hasUpperCase && hasSpecialChar && hasNumber) {
      return null;
    }

    return { passwordRequirements: true };
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  getEmailError(): string {
    if (this.email?.hasError('required')) {
      return 'Email is required';
    }
    if (this.email?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    return '';
  }

  getPasswordError(): string {
    if (this.password?.hasError('required')) {
      return 'Password is required';
    }
    if (this.password?.hasError('minlength')) {
      return 'Password must be at least 8 characters';
    }
    if (this.password?.hasError('passwordRequirements')) {
      return 'Password must contain 1 uppercase letter, 1 special character, and 1 number';
    }
    return '';
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.errorMessage = '';
      const formData = this.registerForm.value;

      this.http
        .post<RegisterResponse>('http://localhost:3000/api/register', formData)
        .subscribe({
          next: (response) => {
            // Hide form and button
            this.showForm = false;
            
            // Show success message
            this.showSuccessMessage = true;
            
            // After 5 seconds, hide success and show user message
            setTimeout(() => {
              this.showSuccessMessage = false;
              this.showUserMessage = true;
              this.userId = response.id;
              
              // Redirect to anime after showing user message
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
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}

