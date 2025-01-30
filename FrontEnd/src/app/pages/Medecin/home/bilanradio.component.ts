import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bilanradio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mx-auto p-6 max-w-4xl">
      <div class="bg-white shadow-lg rounded-lg p-6">
        <!-- En-tête -->
        <div class="border-b pb-4 mb-6">
          <h1 class="text-2xl font-bold text-gray-800 mb-2">Compte Rendu Radiologique</h1>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="font-semibold">Dr. {{radiologistName}}</p>
              <p>{{speciality}}</p>
              <p>{{hospitalName}}</p>
              <p>Tel: {{phone}}</p>
            </div>
            <div class="text-right">
              <p>Date: {{currentDate | date:'dd/MM/yyyy'}}</p>
            </div>
          </div>
        </div>

        <!-- Formulaire -->
        <form [formGroup]="bilanForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <!-- Informations patient -->
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

          <!-- Type d'examen -->
          <div class="form-group">
            <label class="block text-sm font-medium text-gray-700">Type d'examen</label>
            <select 
              formControlName="examType"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Sélectionner un type d'examen</option>
              <option value="radiographie">Radiographie</option>
              <option value="scanner">Scanner</option>
              <option value="irm">IRM</option>
              <option value="echographie">Échographie</option>
              <option value="mammographie">Mammographie</option>
            </select>
          </div>

          <!-- Région anatomique -->
          <div class="form-group">
            <label class="block text-sm font-medium text-gray-700">Région anatomique</label>
            <input 
              type="text" 
              formControlName="anatomicalRegion"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
          </div>

          <!-- Indication clinique -->
          <div class="form-group">
            <label class="block text-sm font-medium text-gray-700">Indication clinique</label>
            <textarea 
              formControlName="clinicalIndication"
              rows="2"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            ></textarea>
          </div>

          <!-- Technique -->
          <div class="form-group">
            <label class="block text-sm font-medium text-gray-700">Technique utilisée</label>
            <textarea 
              formControlName="technique"
              rows="2"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            ></textarea>
          </div>

          <!-- Résultats -->
          <div class="form-group">
            <label class="block text-sm font-medium text-gray-700">Résultats</label>
            <textarea 
              formControlName="findings"
              rows="6"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            ></textarea>
          </div>

          <!-- Conclusion -->
          <div class="form-group">
            <label class="block text-sm font-medium text-gray-700">Conclusion</label>
            <textarea 
              formControlName="conclusion"
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
              [disabled]="!bilanForm.valid"
              class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400"
            >
              Valider le compte rendu
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class BilanradioComponent implements OnInit {
  radiologistName = 'Marie Martin';
  speciality = 'Radiologue';
  hospitalName = 'Centre d\'Imagerie Médicale';
  phone = '01 23 45 67 89';
  currentDate = new Date();

  bilanForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.bilanForm = this.fb.group({
      patientName: ['', Validators.required],
      patientBirthDate: ['', Validators.required],
      examType: ['', Validators.required],
      anatomicalRegion: ['', Validators.required],
      clinicalIndication: ['', Validators.required],
      technique: ['', Validators.required],
      findings: ['', Validators.required],
      conclusion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Initialisation si nécessaire
  }

  resetForm(): void {
    this.bilanForm.reset();
  }

  onSubmit(): void {
    if (this.bilanForm.valid) {
      console.log(this.bilanForm.value);
      // Implémenter la logique de sauvegarde ou d'impression
    }
  }
}
