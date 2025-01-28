import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { Dossier } from '../../../components/dossier/dossier.interface'

@Component({
  selector: 'app-dossier-details',
  templateUrl: './dossier-details.component.html',
  styleUrls: ['./dossier-details.component.css'],
  standalone: true,
  imports: [RouterModule, HeaderComponent, CommonModule]
})
export class DossierDetailsComponent implements OnInit {
  dossierId: string = '';

  dossier : Dossier = {
    id: 0,
    nom: "",
    prenom: "",
    dateCreation: "",
    dateDerniereModification: "",
    medecin: ""
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Get the id parameter from the route
    this.route.params.subscribe(params => {
      this.dossierId = params['id'];
      // Here you can add logic to fetch dossier details using the ID
    });
  }
}
