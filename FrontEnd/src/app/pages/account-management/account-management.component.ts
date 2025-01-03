import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'
import { HeaderComponent } from '../../components/header/header.component'
import { UserComponent } from '../../components/user/user.component'
import { User } from '../../components/user/user.interface'
import { NgIf, NgFor } from '@angular/common';
import { SearchService } from '../../shared/search.service';



@Component({
  selector: 'app-account-management',
  imports: [HeaderComponent, UserComponent, NgIf, NgFor, RouterModule],
  templateUrl: './account-management.component.html',
  styleUrl: './account-management.component.css'
})
export class AccountManagementComponent {

  count = 0;

  users: User[] = [
   {
     id: 1,
     nom: 'Nom',
     prenom: 'Jean',
     dateCreation: '01/01/2024',
     dateDerniereAccede: '02/01/2024',
     username: 'user',
     role: 'Patient'
   },
   {
     id: 2,
     nom: 'Durand',
     prenom: 'Marie',
     dateCreation: '03/01/2024',
     dateDerniereAccede: '03/01/2024',
     username: 'user',
     role: 'Patient'
   },
   {
     id: 3,
     nom: 'Garcia',
     prenom: 'Lucas',
     dateCreation: '05/01/2024',
     dateDerniereAccede: '05/01/2024',
     username: 'user',
     role: 'Patient'
   }
   ];

  filteredUsers: User[] = [];

  constructor(private searchService: SearchService) {
    this.searchService.searchTerms$.subscribe(term => {
      this.filteredUsers = this.users.filter(user =>
        user.nom.toLowerCase().includes(term.toLowerCase()) ||
        user.prenom.toLowerCase().includes(term.toLowerCase()) ||
        user.role.toLowerCase().includes(term.toLowerCase())
      );
      this.count = this.filteredUsers.length;
    });
  }

}
