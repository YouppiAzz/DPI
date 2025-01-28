// src/app/services/dpi.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' }) // Ensure it’s provided globally
export class DpiService {
  private apiUrl = 'http://your-django-api/api'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Example method to fetch data
  getDossiers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dossiers`);
  }

  // Fetch doctor-specific dashboard data
  getMedecinDashboard(medecinId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/medecin/${medecinId}/dashboard`);
  }
}
