import { Component, OnInit } from '@angular/core';

import { RouterModule, ActivatedRoute } from '@angular/router';

import { HeaderComponent } from '../../../components/header/header.component';

import { CommonModule } from '@angular/common';

import { User } from '../../../components/user/user.interface';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-details',

  templateUrl: './user-details.component.html',

  styleUrls: ['./user-details.component.css'],

  standalone: true,

  imports: [RouterModule, HeaderComponent, CommonModule],
})
export class UserDetailsComponent implements OnInit {
  userId: string = '';

  user: User = {
    id: 0,
    nom: '',
    prenom: '',
    // dateCreation: "",
    // dateDerniereAccede: '',
    user_type: '',
    // username: '',
  };

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Get the id parameter from the route

    this.route.params.subscribe((params) => {
      const userId = params['id'];
      this.userService.getUserById(+userId).subscribe({
        next: (user) => (this.user = user),
        error: (error) => console.error('Error loading user:', error),
      });
    });
  }
}
