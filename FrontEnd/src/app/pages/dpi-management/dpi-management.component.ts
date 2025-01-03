import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'
import { HeaderComponent } from '../../components/header/header.component'
import { DossierComponent } from '../../components/dossier/dossier.component'
import { Dossier } from '../../components/dossier/dossier.interface'
import { NgIf, NgFor } from '@angular/common';
import { SearchService } from '../../shared/search.service';



@Component({
  selector: 'app-dpi-management',
  imports: [HeaderComponent, DossierComponent, NgIf, NgFor, RouterModule],
  templateUrl: './dpi-management.component.html',
  styleUrl: './dpi-management.component.css'
})
export class DpiManagementComponent {

  count = 0;

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

  filteredDossiers: Dossier[] = [];

  constructor(private searchService: SearchService) {
    this.searchService.searchTerms$.subscribe(term => {
      this.filteredDossiers = this.dossiers.filter(dossier =>
        dossier.nom.toLowerCase().includes(term.toLowerCase()) ||
        dossier.prenom.toLowerCase().includes(term.toLowerCase()) ||
        dossier.medecin.toLowerCase().includes(term.toLowerCase())
      );
      this.count = this.filteredDossiers.length;
    });
  }

}
