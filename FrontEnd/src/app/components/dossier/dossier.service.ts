import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Dossier } from './dossier.model';

@Injectable({
  providedIn: 'root'
})
export class DossierService {
  private dossiers: Dossier[] = [
    {
      id: '1',
      dateCreation: '22-12-2024',
      dateDerniereModification: '22-12-2024',
      nom: 'Douba',
      prenom: 'Mohamed El Amine',
      numSecu: '111',
      dateNaissance: '22-02-2004',
      adresse: 'El-Marmar Relizane',
      numTel: '0555555555',
      nomContact: 'mère',
      numTelContact: '0666666666',
      medecin: 'Someone',
      infirmier: 'Someone'
    },
    {
      id: '2',
      dateCreation: '21-12-2024',
      dateDerniereModification: '22-12-2024',
      nom: 'Smith',
      prenom: 'John',
      numSecu: '222',
      dateNaissance: '15-05-1990',
      adresse: '123 Main Street',
      numTel: '0555555556',
      nomContact: 'père',
      numTelContact: '0666666667',
      medecin: 'Dr. Brown',
      infirmier: 'Nurse Johnson'
    },
    {
      id: '3',
      dateCreation: '20-12-2024',
      dateDerniereModification: '22-12-2024',
      nom: 'Martin',
      prenom: 'Emma',
      numSecu: '333',
      dateNaissance: '03-08-1985',
      adresse: '456 Oak Avenue',
      numTel: '0555555557',
      nomContact: 'soeur',
      numTelContact: '0666666668',
      medecin: 'Dr. Wilson',
      infirmier: 'Nurse Davis'
    }
  ];

  getDossierById(id: string): Observable<Dossier | undefined> {
    const dossier = this.dossiers.find(d => d.id === id);
    return of(dossier);
  }

  getAllDossiers(): Observable<Dossier[]> {
    return of(this.dossiers);
  }

  addDossier(dossier: Dossier): Observable<Dossier> {
    this.dossiers.push(dossier);
    return of(dossier);
  }

  updateDossier(dossier: Dossier): Observable<Dossier> {
    const index = this.dossiers.findIndex(d => d.id === dossier.id);
    if (index !== -1) {
      this.dossiers[index] = dossier;
    }
    return of(dossier);
  }

  deleteDossier(id: string): Observable<boolean> {
    const index = this.dossiers.findIndex(d => d.id === id);
    if (index !== -1) {
      this.dossiers.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}
