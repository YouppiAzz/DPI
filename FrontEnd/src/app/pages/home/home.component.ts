import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'
import { HeaderComponent } from '../../components/header/header.component'
import { DossierComponent } from '../../components/dossier/dossier.component'
import { Dossier } from '../../components/dossier/dossier.interface'
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, DossierComponent, NgIf, NgFor, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  dossiers: Dossier[] = [
   {
     id: 1,
     nom: 'Nom',
     prenom: 'Jean',
     dateCreation: '01/01/2024',
     dateDerniereModification: '02/01/2024',
     medecin: 'Dr. Martin'
   },
   {
     id: 2,
     nom: 'Durand',
     prenom: 'Marie',
     dateCreation: '03/01/2024',
     dateDerniereModification: '03/01/2024',
     medecin: 'Dr. Bernard'
   },
   {
     id: 3,
     nom: 'Garcia',
     prenom: 'Lucas',
     dateCreation: '05/01/2024',
     dateDerniereModification: '05/01/2024',
     medecin: 'Dr. Martin'
   }
   ];

   count = this.dossiers.length;
   patientsCount = 157;
   medecinsCount = 10;
   infirmiersCount = 7;
   pharmaciensCount = 4;
   laborantinsCount = 6;
   radiologuesCount = 3;

}
