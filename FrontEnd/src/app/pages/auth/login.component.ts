import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

interface LoginFormInterface {
  email: string | null;
  password: string | null;
  rememberMe: boolean | null;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    rememberMe: FormControl<boolean | null>;
  }>;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      rememberMe: new FormControl(false),
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      // this.router.navigate(['/home']);
    }
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      try {
        const { email, password, rememberMe } = this.loginForm.getRawValue();
        await this.authService.login(email ?? '', password ?? '');

        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }

        // Get the logged-in user's data
        const user = this.authService.getCurrentUser();

        // Determine route based on user role
        let targetRoute = '/home'; // Default for admin/unknown roles
        if (user) {
          switch (user.user_type.toLowerCase()) {
            case 'medecin':
              targetRoute = '/medecin/home';
              break;
            case 'infirmier':
              targetRoute = '/infirmier';
              break;
            case 'patient':
              targetRoute = '/patient/home'; // Add if exists
              break;
            case 'admin':
              targetRoute = '/home'; // Add if exists
              break;
            default:
              targetRoute = '/patient/home';
              break;
            // Add other roles as needed
          }
        }

        this.router.navigate([targetRoute]);
      } catch (error) {
        this.errorMessage =
          error instanceof Error
            ? error.message
            : 'An error occurred during login';
      } finally {
        this.isLoading = false;
      }
    }
  }
}
