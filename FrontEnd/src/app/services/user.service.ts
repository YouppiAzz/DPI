// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../components/user/user.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/`);
  }

  createUser(userData: any): Observable<User> {
    // Adjust payload structure to match your backend expectations
    const payload = {
      nom: userData.nom,
      prenom: userData.prenom,
      // social_security: userData.numSecu,
      email: userData.email,
      password: userData.password,
      user_type: userData.userType,
    };
    return this.http.post<User>(`${this.apiUrl}/create/`, payload);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}/`);
  }
}
