// src/app/services/dpi.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  map,
  switchMap,
  catchError,
  throwError,
  forkJoin,
} from 'rxjs';
import { Dossier } from '../components/dossier/dossier.interface';
// import { User } from '../components/user/user.interface';
import { DPI } from '../models/dpi.models';
import { User } from '../components/user/user.interface';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' }) // Ensure it’s provided globally
export class DpiService {
  private apiUrl = 'http://127.0.0.1:8000/api/dpis';

  constructor(private http: HttpClient, private userService: UserService) {}

  private transformDPItoDossier(dpi: DPI): Dossier {
    const patient = dpi.patient[0]; // Assuming there's always at least one patient

    return {
      id: dpi.id,
      // dateCreation: dpi.date_creation,
      // dateDerniereModification: dpi.date_creation, // Using creation date if no modification date available
      nom: patient.nom,
      prenom: patient.prenom,
      numSecu: patient.numero_securite_sociale,
      dateNaissance: patient.date_naissance,
      adresse: patient.adresse,
      numTel: patient.telephone,
      nomContact: patient.emergency_contact_name,
      numTelContact: patient.emergency_contact_phone,
      medecin: dpi.medecin_traitant,
      infirmier: '', // Add if available in your backend
    };
  }

  // Helper function to find a user by name
  private findUserByName(
    users: User[],
    nom: string,
    prenom: string
  ): User | undefined {
    return users.find(
      (user) =>
        user.nom.toLowerCase() === nom.toLowerCase() &&
        user.prenom.toLowerCase() === prenom.toLowerCase()
    );
  }

  // Updated helper function to find a doctor by full name
  private findDoctorByName(users: User[], fullName: string): User | undefined {
    // Split the full name into nom and prenom
    const [nom, prenom] = fullName.split(' ').map((part) => part.trim());

    return users.find(
      (user) =>
        user.nom.toLowerCase() === nom.toLowerCase() &&
        user.prenom?.toLowerCase() === prenom?.toLowerCase() && // Handle optional prenom
        user.user_type === 'medecin'
    );
  }

  private findNurseByName(users: User[], fullName: string): User | undefined {
    // Split the full name into nom and prenom
    const [nom, prenom] = fullName.split(' ').map((part) => part.trim());

    return users.find(
      (user) =>
        user.nom.toLowerCase() === nom.toLowerCase() &&
        user.prenom?.toLowerCase() === prenom?.toLowerCase() && // Handle optional prenom
        user.user_type === 'infirmier'
    );
  }

  // Get all dossiers
  getDossiers(): Observable<Dossier[]> {
    return this.http
      .get<DPI[]>(`${this.apiUrl}/`)
      .pipe(map((dpis) => dpis.map((dpi) => this.transformDPItoDossier(dpi))));
  }

  // Get a specific dossier by ID
  getDossierById(id: string): Observable<Dossier> {
    return this.http
      .get<DPI>(`${this.apiUrl}/patient/${id}/`)
      .pipe(map((dpi) => this.transformDPItoDossier(dpi)));
  }

  // Create a new dossier
  createDossier(dossierData: any): Observable<Dossier> {
    // First, fetch all users to find patient and doctor IDs
    return this.userService.getUsers().pipe(
      switchMap((users) => {
        // Find the patient in the users list
        const patient = this.findUserByName(
          users,
          dossierData.nom,
          dossierData.prenom
        );
        if (!patient) {
          return throwError(() => new Error('Patient not found in the system'));
        }

        // Find the doctor in the users list
        const doctor = this.findDoctorByName(users, dossierData.medecin);
        if (!doctor) {
          return throwError(() => new Error('Doctor not found in the system'));
        }

        // Find the nurse in the userss list
        const nurse = this.findNurseByName(users, dossierData.infirmier);
        if (!nurse) {
          return throwError(() => new Error('Nurse not found in the system'));
        }

        // Prepare the data according to backend expectations
        const dpiData = {
          patient_id: patient.id,
          medecin_traitant_id: doctor.id,
          infirmier_id: nurse.id,
          // Include other required fields
          mutuelle: dossierData.mutuelle || '',
          poids: dossierData.poids || null,
          groupe_sanguin: dossierData.groupe_sanguin || '',
          // Add patient details
          patient_details: {
            numero_securite_sociale: dossierData.numSecu,
            date_naissance: dossierData.dateNaissance,
            adresse: dossierData.adresse,
            telephone: dossierData.numTel,
            emergency_contact_name: dossierData.nomContact,
            emergency_contact_phone: dossierData.numTelContact,
          },
        };

        // Create the dossier with the prepared data
        return this.http.post<DPI>(`${this.apiUrl}/create/`, dpiData).pipe(
          map((response) => this.transformDPItoDossier(response)),
          catchError((error) => {
            console.error('Error creating dossier:', error);
            return throwError(
              () => new Error('Failed to create dossier. Please try again.')
            );
          })
        );
      })
    );
  }

  // Update an existing dossier
  updateDossier(id: string, dossier: any): Observable<Dossier> {
    const dpiData = {
      patient: [
        {
          nom: dossier.nom,
          prenom: dossier.prenom,
          numero_securite_sociale: dossier.numSecu,
          date_naissance: dossier.dateNaissance,
          adresse: dossier.adresse,
          telephone: dossier.numTel,
          emergency_contact_name: dossier.nomContact,
          emergency_contact_phone: dossier.numTelContact,
        },
      ],
      medecin_traitant: dossier.medecin,
    };

    return this.http
      .put<DPI>(`${this.apiUrl}/${id}/`, dpiData)
      .pipe(map((dpi) => this.transformDPItoDossier(dpi)));
  }

  // Delete a dossier
  deleteDossier(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/`);
  }

  // Fetch doctor-specific dashboard data
  getMedecinDashboard(medecinId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/medecin/${medecinId}/dashboard/`);
  }
}
