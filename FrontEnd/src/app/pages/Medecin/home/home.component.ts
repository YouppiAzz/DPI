// home.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../components/header/header.component';
import { DossierComponent } from '../../../components/dossier/dossier.component';
import { Dossier } from '../../../components/dossier/dossier.interface';
import { NgIf, NgFor } from '@angular/common';
import { DpiService } from '../../../services/dpi.service'; // New service
import { AuthService } from '../../../pages/auth/auth.service'; // Auth service

@Component({
  selector: 'app-medecin-home',
  standalone: true,
  imports: [HeaderComponent, DossierComponent, NgIf, NgFor, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class MedecinHomeComponent implements OnInit {
  // Doctor-specific data
  currentMedecin = 'Dr. Someone';
  role = 'Médecin';
  errorMessage = '';
  dossiers: any[] = [];
  patientsCount = 0;
  isLoading = true;

  constructor(
    private dpiService: DpiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Get current doctor's ID from AuthService
    const medecinId = this.authService.currentUserValue?.id;

    if (medecinId) {
      this.dpiService.getMedecinDashboard(medecinId).subscribe({
        next: (data) => {
          this.dossiers = data.recentDossiers;
          this.patientsCount = data.patientsCount;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Failed to load dashboard:', error);
          this.errorMessage = 'Erreur de chargement des données';
          this.isLoading = false;
        },
      });
    } else {
      console.error('No doctor ID found!');
      this.isLoading = false;
    }
  }
}
