import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { DossierComponent } from '../../components/dossier/dossier.component';
import { Dossier } from '../../components/dossier/dossier.interface';
import { NgIf, NgFor } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../../services/user.service';
import { DpiService } from '../../services/dpi.service';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, DossierComponent, NgIf, NgFor, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  // dossiers: Dossier[] = [
  //   {
  //     id: 1,
  //     nom: 'Nom',
  //     prenom: 'Jean',
  //     //  dateCreation: '01/01/2024',
  //     //  dateDerniereModification: '02/01/2024',
  //     medecin: 'Dr. Martin',
  //   },
  //   {
  //     id: 2,
  //     nom: 'Durand',
  //     prenom: 'Marie',
  //     //  dateCreation: '03/01/2024',
  //     //  dateDerniereModification: '03/01/2024',
  //     medecin: 'Dr. Bernard',
  //   },
  //   {
  //     id: 3,
  //     nom: 'Garcia',
  //     prenom: 'Lucas',
  //     //  dateCreation: '05/01/2024',
  //     //  dateDerniereModification: '05/01/2024',
  //     medecin: 'Dr. Martin',
  //   },
  // ];

  // userName: string = 'Amine Douba';
  // userRole: string = 'Admin';

  patientsCount = 0;
  medecinsCount = 0;
  infirmiersCount = 0;
  pharmaciensCount = 0;
  laborantinsCount = 0;
  radiologuesCount = 0;

  dossiers: Dossier[] = [];

  constructor(
    private authService: AuthService, // Inject AuthService
    private userService: UserService,
    private dpiService: DpiService
  ) {}

  ngOnInit() {
    // Load statistics and dossiers
    this.loadStatistics();
    this.loadRecentDossiers();
  }

  private loadStatistics() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.patientsCount = users.filter(
          (u) => u.user_type === 'patient'
        ).length;
        this.medecinsCount = users.filter(
          (u) => u.user_type === 'medecin'
        ).length;
        this.infirmiersCount = users.filter(
          (u) => u.user_type === 'infirmier'
        ).length;
        this.pharmaciensCount = users.filter(
          (u) => u.user_type === 'pharmacien'
        ).length;
        this.laborantinsCount = users.filter(
          (u) => u.user_type === 'laborantin'
        ).length;
        this.radiologuesCount = users.filter(
          (u) => u.user_type === 'radiologue'
        ).length;
      },
      error: (error) => {
        console.error('Error loading user statistics:', error);
      },
    });
  }

  private loadRecentDossiers() {
    this.dpiService.getDossiers().subscribe({
      next: (dossiers) => {
        // Sort by dateCreation (if available) and take the first 5
        this.dossiers = dossiers.slice(0, 5);
      },
      error: (error) => {
        console.error('Error loading recent dossiers:', error);
      },
    });
  }

  // count = this.dossiers.length;
  // patientsCount = 157;
  // medecinsCount = 10;
  // infirmiersCount = 7;
  // pharmaciensCount = 4;
  // laborantinsCount = 6;
  // radiologuesCount = 3;
}
