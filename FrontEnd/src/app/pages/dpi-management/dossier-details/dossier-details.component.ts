import { Component, OnInit } from '@angular/core';

import { RouterModule, ActivatedRoute, Router } from '@angular/router';

import { HeaderComponent } from '../../../components/header/header.component';

import { CommonModule } from '@angular/common';

import { Dossier } from '../../../components/dossier/dossier.interface';

import { DpiService } from '../../../services/dpi.service';

@Component({
  selector: 'app-dossier-details',

  templateUrl: './dossier-details.component.html',

  styleUrls: ['./dossier-details.component.css'],

  standalone: true,

  imports: [RouterModule, HeaderComponent, CommonModule],
})
export class DossierDetailsComponent implements OnInit {
  dossierId: string = '';

  dossier: Dossier = {
    id: 0,
    nom: '',
    prenom: '',
    // dateCreation: '',
    // dateDerniereModification: '',
    medecin: '',
  };

  constructor(
    private route: ActivatedRoute,
    private dpiService: DpiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the id parameter from the route

    this.route.params.subscribe((params) => {
      this.dossierId = params['id'];
      this.loadDossierDetails();
      // Here you can add logic to fetch dossier details using the ID
    });
  }

  private loadDossierDetails() {
    this.dpiService.getDossierById(this.dossierId).subscribe({
      next: (dossier) => {
        this.dossier = dossier;
      },
      error: (error) => {
        console.error('Error loading dossier details:', error);
        // Handle error - maybe redirect to the list page
        this.router.navigate(['/dpi-management']);
      },
    });
  }
}
