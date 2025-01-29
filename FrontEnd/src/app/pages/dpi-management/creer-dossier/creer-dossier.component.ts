import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HeaderComponent } from '../../../components/header/header.component';
import { Router } from '@angular/router';
import { DpiService } from '../../../services/dpi.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../components/user/user.interface';
import { CommonModule } from '@angular/common'; // Add for *ngFor

@Component({
  selector: 'app-creer-dossier',
  templateUrl: './creer-dossier.component.html',
  imports: [ReactiveFormsModule, HeaderComponent, CommonModule],
  standalone: true,
})
export class CreerDossierComponent implements OnInit {
  dossierForm: FormGroup;
  isSubmitting = false;
  patients: User[] = []; // List of patients
  doctors: User[] = []; // List of doctors
  nurses: User[] = []; // List of nurses

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private dpiService: DpiService,
    private userService: UserService // Inject UserService
  ) {
    this.dossierForm = this.fb.group({
      //Informations du Patient

      selectedPatientId: ['', Validators.required],
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

  ngOnInit() {
    // Fetch all users and filter by role
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.patients = users.filter((user) => user.user_type === 'patient');
        this.doctors = users.filter((user) => user.user_type === 'medecin');
        this.nurses = users.filter((user) => user.user_type === 'infirmier');
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      },
    });
  }

  onSubmit() {
    if (this.dossierForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      // Extract selected patient's details
      const selectedPatientId = this.dossierForm.value.selectedPatientId;
      console.log(selectedPatientId);
      const selectedPatient = this.patients.find(
        (p) => p.id == selectedPatientId
      );

      if (!selectedPatient) {
        console.error('Selected patient not found');
        this.isSubmitting = false;
        return;
      }

      // Prepare data for backend
      const dossierData = {
        ...this.dossierForm.value,
        nom: selectedPatient.nom, // Add nom from selected patient
        prenom: selectedPatient.prenom, // Add prenom from selected patient
      };

      // Remove unused field (selectedPatientId)
      delete dossierData.selectedPatientId;

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
