// src/app/services/dpi.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' }) // Ensure it’s provided globally
export class DpiService {
  private apiUrl = 'http://127.0.0.1:8000/api';

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
