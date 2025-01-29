import { Component, Input } from '@angular/core';
import { User } from './user.interface';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowTopRightOnSquare } from '@ng-icons/heroicons/outline';
import { RouterModule } from '@angular/router';

@Component({
  imports: [NgIcon, RouterModule],
  viewProviders: [provideIcons({ heroArrowTopRightOnSquare })],
  selector: 'app-user',
  standalone: true,
  template: `
    <div class="flex items-center py-4 border-b border-gray-200">
      <p class="w-[20%]">{{ user.id }}</p>

      <p class="w-[20%]">{{ user.nom }}</p>
      <p class="w-[20%]">{{ user.prenom }}</p>
      <p class="w-[20%]">{{ user.email }}</p>
      <p class="w-[20%]">{{ user.user_type }}</p>
      <!-- <p class="w-[16.67%]">{{user.dateCreation}}</p> -->
      <!-- <a [routerLink]="['/account-management/user', user.id]"
        ><ng-icon name="heroArrowTopRightOnSquare"></ng-icon
      ></a> -->
    </div>
  `,
})
export class UserComponent {
  @Input() user!: User;
}
