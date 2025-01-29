import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { DossierComponent } from '../../components/dossier/dossier.component';
import { Dossier } from '../../components/dossier/dossier.interface';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-infirmier-home',
  imports: [HeaderComponent, DossierComponent, NgIf, NgFor, RouterModule],
  templateUrl: './infirmier.component.html',
  styleUrl: './infirmier.component.css',
})
export class InfirmierHomeComponent {
  patients: any[] = [
    {
      id: 1,
      nom: 'Doe',
      prenom: 'John',
      chambre: '101',
      etat: 'stable',
      prochainSoin: '10/02/2024',
      soinEnAttente: true,
    },
    {
      id: 2,
      nom: 'Smith',
      prenom: 'Jane',
      chambre: '102',
      etat: 'en observation',
      prochainSoin: '10/02/2024',
      soinEnAttente: false,
    },
    {
      id: 3,
      nom: 'Martin',
      prenom: 'Paul',
      chambre: '103',
      etat: 'critique',
      prochainSoin: '10/02/2024',
      soinEnAttente: true,
    },
  ];

  // Statistics
  assignedPatientsCount = this.patients.length;
  pendingSoinsCount = 5;
  completedSoinsCount = 12;

  // Component properties
  currentInfirmier = 'Inf. Dupont';
  role = 'Infirmier';
  errorMessage = '';
  filteredPatients = this.patients;
  isLoading = false;

  // onSearch(query: string): void {
  //   const inputElement = event.target as HTMLInputElement;
  //   const searchQuery = inputElement.value;
  //   if (!query) {
  //     this.filteredPatients = this.patients;
  //     return;
  //   }

  //   query = query.toLowerCase();
  //   this.filteredPatients = this.patients.filter(
  //     (patient) =>
  //       patient.nom.toLowerCase().includes(query) ||
  //       patient.prenom.toLowerCase().includes(query) ||
  //       patient.chambre.toLowerCase().includes(query)
  //   );
  // }

  getStatusClass(status: string): string {
    const baseClasses = 'px-2 py-1 rounded-full text-sm';
    switch (status.toLowerCase()) {
      case 'stable':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'en observation':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'critique':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  }

  viewDossier(patientId: number): void {
    // TODO: Implement when needed
  }

  effectuerSoin(patientId: number): void {
    // TODO: Implement when needed
  }
}
