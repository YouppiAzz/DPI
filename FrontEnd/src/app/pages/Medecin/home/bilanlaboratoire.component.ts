import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface AnalyseResult {
  name: string;
  value: number;
  unit: string;
  referenceRange: string;
}

@Component({
  selector: 'app-bilanlaboratoire',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mx-auto p-6 max-w-4xl">
      <div class="bg-white shadow-lg rounded-lg p-6">
        <!-- En-tête -->
        <div class="border-b pb-4 mb-6">
          <h1 class="text-2xl font-bold text-gray-800 mb-2">Compte Rendu d'Analyses Biologiques</h1>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="font-semibold">{{laboratoryName}}</p>
              <p>Dr. {{biologistName}}</p>
              <p>{{address}}</p>
              <p>Tel: {{phone}}</p>
            </div>
            <div class="text-right">
              <p>Date du prélèvement: {{currentDate | date:'dd/MM/yyyy'}}</p>
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

          <!-- Type de bilan -->
          <div class="form-group">
            <label class="block text-sm font-medium text-gray-700">Type de bilan</label>
            <select 
              formControlName="bilanType"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Sélectionner un type de bilan</option>
              <option value="nfs">NFS (Numération Formule Sanguine)</option>
              <option value="biochimie">Biochimie</option>
              <option value="coagulation">Bilan de coagulation</option>
              <option value="hepatique">Bilan hépatique</option>
              <option value="renal">Bilan rénal</option>
              <option value="thyroide">Bilan thyroïdien</option>
            </select>
          </div>

          <!-- Résultats des analyses -->
          <div formArrayName="analyses" class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-700">Résultats des analyses</h3>
            
            <div *ngFor="let analyse of analyses.controls; let i=index" [formGroupName]="i"
                 class="p-4 border rounded-lg bg-gray-50">
              <div class="grid grid-cols-4 gap-4">
                <div class="form-group">
                  <label class="block text-sm font-medium text-gray-700">Paramètre</label>
                  <input 
                    type="text"
                    formControlName="name"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                </div>
                <div class="form-group">
                  <label class="block text-sm font-medium text-gray-700">Valeur</label>
                  <input 
                    type="number"
                    formControlName="value"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                </div>
                <div class="form-group">
                  <label class="block text-sm font-medium text-gray-700">Unité</label>
                  <input 
                    type="text"
                    formControlName="unit"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                </div>
                <div class="form-group">
                  <label class="block text-sm font-medium text-gray-700">Valeurs de référence</label>
                  <input 
                    type="text"
                    formControlName="referenceRange"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                </div>
              </div>
              <button 
                type="button" 
                (click)="removeAnalyse(i)"
                class="mt-2 text-red-600 hover:text-red-800"
              >
                Supprimer
              </button>
            </div>
          </div>

          <button 
            type="button"
            (click)="addAnalyse()"
            class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Ajouter un paramètre
          </button>

          <!-- Interprétation -->
          <div class="form-group">
            <label class="block text-sm font-medium text-gray-700">Interprétation</label>
            <textarea 
              formControlName="interpretation"
              rows="4"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            ></textarea>
          </div>

          <!-- Commentaires -->
          <div class="form-group">
            <label class="block text-sm font-medium text-gray-700">Commentaires</label>
            <textarea 
              formControlName="comments"
              rows="2"
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
export class BilanlaboratoireComponent implements OnInit {
  laboratoryName = 'Laboratoire Central d\'Analyses';
  biologistName = 'Sophie Dubois';
  address = '45 Rue des Sciences, 75000 Paris';
  phone = '01 23 45 67 89';
  currentDate = new Date();

  bilanForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.bilanForm = this.fb.group({
      patientName: ['', Validators.required],
      patientBirthDate: ['', Validators.required],
      bilanType: ['', Validators.required],
      analyses: this.fb.array([]),
      interpretation: ['', Validators.required],
      comments: ['']
    });
  }

  ngOnInit(): void {
    this.addAnalyse(); // Ajoute une première ligne d'analyse par défaut
  }

  get analyses() {
    return this.bilanForm.get('analyses') as FormArray;
  }

  createAnalyseFormGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      value: ['', Validators.required],
      unit: ['', Validators.required],
      referenceRange: ['', Validators.required]
    });
  }

  addAnalyse(): void {
    this.analyses.push(this.createAnalyseFormGroup());
  }

  removeAnalyse(index: number): void {
    this.analyses.removeAt(index);
  }

  resetForm(): void {
    this.bilanForm.reset();
    this.analyses.clear();
    this.addAnalyse();
  }

  onSubmit(): void {
    if (this.bilanForm.valid) {
      console.log(this.bilanForm.value);
      // Implémenter la logique de sauvegarde ou d'impression
    }
  }
}
