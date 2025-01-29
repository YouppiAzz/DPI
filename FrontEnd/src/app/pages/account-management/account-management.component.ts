import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { UserComponent } from '../../components/user/user.component';
import { User } from '../../components/user/user.interface';
import { NgIf, NgFor } from '@angular/common';
import { SearchService } from '../../shared/search.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-account-management',
  imports: [HeaderComponent, UserComponent, NgIf, NgFor, RouterModule],
  templateUrl: './account-management.component.html',
  styleUrl: './account-management.component.css',
})
export class AccountManagementComponent {
  count = 0;

  // users: User[] = [
  //   {
  //     id: 1,
  //     nom: 'Nom',
  //     prenom: 'Jean',
  //     // dateCreation: '01/01/2024',
  //     // dateDerniereAccede: '02/01/2024',
  //     // username: 'user',
  //     role: 'Patient',
  //     email: 'tes@gmail.com',
  //   },
  //   {
  //     id: 2,
  //     nom: 'Durand',
  //     prenom: 'Marie',
  //     // dateCreation: '03/01/2024',
  //     // dateDerniereAccede: '03/01/2024',
  //     // username: 'user',
  //     role: 'Patient',
  //     email: 'tes@gmail.com',
  //   },
  //   {
  //     id: 3,
  //     nom: 'Garcia',
  //     prenom: 'Lucas',
  //     // dateCreation: '05/01/2024',
  //     // dateDerniereAccede: '05/01/2024',
  //     // username: 'user',
  //     role: 'Patient',
  //     email: 'tes@gmail.com',
  //   },
  // ];

  users: User[] = [];

  filteredUsers: User[] = [];

  constructor(
    private searchService: SearchService,
    private userService: UserService
  ) {
    this.searchService.searchTerms$.subscribe((term) => {
      this.filteredUsers = this.users.filter(
        (user) =>
          user.nom.toLowerCase().includes(term.toLowerCase()) ||
          user.prenom.toLowerCase().includes(term.toLowerCase()) ||
          user.user_type.toLowerCase().includes(term.toLowerCase())
      );
      this.count = this.filteredUsers.length;
    });
  }

  ngOnInit(): void {
    console.log('hello');
    this.loadUsers();
  }

  private loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = users;
        console.log(users[0].id);
        this.count = users.length;
      },
      error: (error) => console.error('Error loading users:', error),
    });
  }
}
