import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../components/header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creer-dossier',
  templateUrl: './creer-dossier.component.html',
  imports: [ReactiveFormsModule, HeaderComponent],
  standalone: true
})
export class CreerDossierComponent {
  dossierForm: FormGroup;

  constructor(public fb: FormBuilder,public router: Router) {
    this.dossierForm = this.fb.group({

      //Informations du Patient

      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      numSecu: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      adresse: ['', Validators.required],
      numTel: ['', Validators.required],

      //Contact d'urgence

      nomContact: ['', Validators.required],
      numTelContact: ['', Validators.required],

      //Equipe medicale

      medecin: ['', Validators.required],
      infirmier: ['', Validators.required],

    });
  }

  onSubmit() {
    if (this.dossierForm.valid) {
      console.log(this.dossierForm.value);
      this.router.navigate(['/dpi-management']);
    }
  }
}
