import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

@Component({
  selector: 'app-ordonnance',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mx-auto p-6 max-w-4xl">
      <div class="bg-white shadow-lg rounded-lg p-6">
        <!-- En-tête de l'ordonnance -->
        <div class="border-b pb-4 mb-6">
          <h1 class="text-2xl font-bold text-gray-800 mb-2">Ordonnance Médicale</h1>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="font-semibold">Dr. {{doctorName}}</p>
              <p>{{speciality}}</p>
              <p>{{address}}</p>
              <p>Tel: {{phone}}</p>
            </div>
            <div class="text-right">
              <p>Date: {{currentDate | date:'dd/MM/yyyy'}}</p>
            </div>
          </div>
        </div>

        <!-- Informations du patient -->
        <form [formGroup]="ordonnanceForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700">Nom du patient</label>
              <input 
                type="text" 
                formControlName="patientName"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
            </div>
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700">Date de naissance</label>
              <input 
                type="date" 
                formControlName="patientBirthDate"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
            </div>
          </div>

          <!-- Liste des médicaments -->
          <div formArrayName="medications" class="space-y-4">
            <div *ngFor="let medication of medications.controls; let i=index" [formGroupName]="i"
                 class="p-4 border rounded-lg bg-gray-50">
              <div class="grid grid-cols-4 gap-4">
                <div class="form-group">
                  <label class="block text-sm font-medium text-gray-700">Médicament</label>
                  <input 
                    type="text"
                    formControlName="name"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                </div>
                <div class="form-group">
                  <label class="block text-sm font-medium text-gray-700">Dosage</label>
                  <input 
                    type="text"
                    formControlName="dosage"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                </div>
                <div class="form-group">
                  <label class="block text-sm font-medium text-gray-700">Fréquence</label>
                  <input 
                    type="text"
                    formControlName="frequency"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                </div>
                <div class="form-group">
                  <label class="block text-sm font-medium text-gray-700">Durée</label>
                  <input 
                    type="text"
                    formControlName="duration"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                </div>
              </div>
              <button 
                type="button" 
                (click)="removeMedication(i)"
                class="mt-2 text-red-600 hover:text-red-800"
              >
                Supprimer
              </button>
            </div>
          </div>

          <button 
            type="button"
            (click)="addMedication()"
            class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Ajouter un médicament
          </button>

          <!-- Notes et commentaires -->
          <div class="form-group">
            <label class="block text-sm font-medium text-gray-700">Notes et recommandations</label>
            <textarea 
              formControlName="notes"
              rows="4"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            ></textarea>
          </div>

          <!-- Boutons d'action -->
          <div class="flex justify-end space-x-4">
            <button 
              type="button"
              (click)="resetForm()"
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Réinitialiser
            </button>
            <button 
              type="submit"
              [disabled]="!ordonnanceForm.valid"
              class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400"
            >
              Imprimer l'ordonnance
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class OrdonnanceComponent implements OnInit {
  doctorName = 'Jean Dupont';
  speciality = 'Médecin Généraliste';
  address = '123 Avenue de la Médecine, 75000 Paris';
  phone = '01 23 45 67 89';
  currentDate = new Date();

  ordonnanceForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.ordonnanceForm = this.fb.group({
      patientName: ['', Validators.required],
      patientBirthDate: ['', Validators.required],
      medications: this.fb.array([]),
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.addMedication(); // Ajoute une première ligne de médicament par défaut
  }

  get medications() {
    return this.ordonnanceForm.get('medications') as FormArray;
  }

  createMedicationFormGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      dosage: ['', Validators.required],
      frequency: ['', Validators.required],
      duration: ['', Validators.required]
    });
  }

  addMedication(): void {
    this.medications.push(this.createMedicationFormGroup());
  }

  removeMedication(index: number): void {
    this.medications.removeAt(index);
  }

  resetForm(): void {
    this.ordonnanceForm.reset();
    this.medications.clear();
    this.addMedication();
  }

  onSubmit(): void {
    if (this.ordonnanceForm.valid) {
      // Ici, vous pouvez ajouter la logique pour imprimer ou sauvegarder l'ordonnance
      console.log(this.ordonnanceForm.value);
      // Implémenter la logique d'impression ou de sauvegarde
    }
  }
}
