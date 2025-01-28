import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

interface SignupFormInterface {
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
  firstName: string | null;
  lastName: string | null;
  acceptTerms: boolean | null;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html', 
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      acceptTerms: [false, [Validators.requiredTrue]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password?.value !== confirmPassword?.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  async onSubmit(): Promise<void> {
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      try {
        const formValue = this.signupForm.getRawValue();
        await this.authService.signup({
          email: formValue.email ?? '',
          password: formValue.password ?? '',
          firstName: formValue.firstName ?? '',
          lastName: formValue.lastName ?? ''
        });
        
        this.router.navigate(['/login']);
      } catch (error) {
        this.errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'inscription';
      } finally {
        this.isLoading = false;
      }
    }
  }
}