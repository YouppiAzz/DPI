import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

interface LoginResponse {
  access: string;
  refresh: string;
  user_type: string;
}

interface SignupRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface SignupResponse {
  message: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'http://127.0.0.1:8000';
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_data';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  // Getter for current user value (simplifies access)
  get currentUserValue(): any {
    return this.currentUserSubject.value;
    // return 'Médecin';
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private getFromStorage(key: string): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(key);
    }
    return null;
  }

  private setInStorage(key: string, value: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(key, value);
    }
  }

  private removeFromStorage(key: string): void {
    if (this.isBrowser()) {
      localStorage.removeItem(key);
    }
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await firstValueFrom(
        this.http.post<LoginResponse>(`${this.API_URL}/api/login/`, {
          email,
          password,
        })
      );

      if (response && response.access && response.user_type) {
        this.setInStorage(this.TOKEN_KEY, response.access);
        this.setInStorage(this.USER_KEY, JSON.stringify(response.user_type));
        return response;
      }

      throw new Error('Invalid login response');
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Login failed: ' + error.message);
      }
      throw new Error('An error occurred during login');
    }
  }

  async signup(data: SignupRequest): Promise<SignupResponse> {
    try {
      const response = await firstValueFrom(
        this.http.post<SignupResponse>(`${this.API_URL}/api/signup/`, data)
      );

      if (response && response.user) {
        return response;
      }

      throw new Error('Invalid signup response');
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Échec de l'inscription: " + error.message);
      }
      throw new Error("Une erreur est survenue lors de l'inscription");
    }
  }

  logout(): void {
    this.removeFromStorage(this.TOKEN_KEY);
    this.removeFromStorage(this.USER_KEY);
    this.removeFromStorage('rememberMe');
  }

  getToken(): string | null {
    return this.getFromStorage(this.TOKEN_KEY);
  }

  private setToken(token: string): void {
    this.setInStorage(this.TOKEN_KEY, token);
  }

  private setUserData(user: any): void {
    this.setInStorage(this.USER_KEY, JSON.stringify(user));
  }

  getUserData(): any {
    const userData = this.getFromStorage(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  isLoggedIn(): boolean {
    // return !!localStorage.getItem('auth_token');
    return !!this.getToken();
  }

  async refreshToken(): Promise<void> {
    try {
      const token = this.getToken();
      if (!token) {
        throw new Error('No token found');
      }

      const response = await firstValueFrom(
        this.http.post<{ access: string }>(`${this.API_URL}/auth/refresh/`, {})
      );

      if (response && response.access) {
        this.setToken(response.access);
        console.log(response);
      } else {
        throw new Error('Invalid refresh token response');
      }
    } catch (error) {
      this.logout();
      throw error;
    }
  }
}
