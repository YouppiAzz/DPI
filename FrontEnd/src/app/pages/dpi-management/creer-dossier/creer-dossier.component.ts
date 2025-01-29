import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HeaderComponent } from '../../../components/header/header.component';
import { Router } from '@angular/router';
import { DpiService } from '../../../services/dpi.service';

@Component({
  selector: 'app-creer-dossier',
  templateUrl: './creer-dossier.component.html',
  imports: [ReactiveFormsModule, HeaderComponent],
  standalone: true,
})
export class CreerDossierComponent {
  dossierForm: FormGroup;
  isSubmitting = false;

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private dpiService: DpiService
  ) {
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
    if (this.dossierForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      // Add creation date and last modified date
      const dossierData = {
        ...this.dossierForm.value,
        // dateCreation: new Date().toISOString(),
        // dateDerniereModification: new Date().toISOString(),
      };

      this.dpiService.createDossier(dossierData).subscribe({
        next: () => {
          // Navigate back to the list on success
          this.router.navigate(['/dpi-management']);
        },
        error: (error) => {
          console.error('Error creating dossier:', error);
          this.isSubmitting = false;
          // Here you might want to show an error message to the user
        },
      });
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.dossierForm.controls).forEach((key) => {
        const control = this.dossierForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}
