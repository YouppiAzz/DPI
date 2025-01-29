import { Component, Input } from '@angular/core';
import { Dossier } from './dossier.interface';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowTopRightOnSquare } from '@ng-icons/heroicons/outline';
import { RouterModule } from '@angular/router';

@Component({
  imports: [NgIcon, RouterModule],
  viewProviders: [provideIcons({ heroArrowTopRightOnSquare })],
  selector: 'app-dossier',
  standalone: true,
  template: `
    <div class="flex items-center py-4 border-b border-gray-200">
      <p class="w-[20%]">{{ dossier.id }}</p>
      <p class="w-[20%]">{{ dossier.nom }}</p>
      <p class="w-[20%]">{{ dossier.prenom }}</p>
      <p class="w-[20%]">{{ dossier.numSecu }}</p>
      <!-- <p class="w-[20%]">{{dossier.dateCreation}}</p> -->
      <!-- <p class="w-[20%]">{{dossier.dateDerniereModification}}</p> -->
      <p class="w-[18%]">{{ dossier.medecin }}</p>
      <a [routerLink]="['/dpi-management/dossier', dossier.id]"
        ><ng-icon name="heroArrowTopRightOnSquare"></ng-icon
      ></a>
    </div>
  `,
})
export class DossierComponent {
  @Input() dossier!: Dossier;
}
