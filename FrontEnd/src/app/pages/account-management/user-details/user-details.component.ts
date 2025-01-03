import { Component, OnInit } from '@angular/core';

import { RouterModule, ActivatedRoute } from '@angular/router';

import { HeaderComponent } from '../../../components/header/header.component';

import { CommonModule } from '@angular/common';

import { User } from '../../../components/user/user.interface'

@Component({

  selector: 'app-user-details',

  templateUrl: './user-details.component.html',

  styleUrls: ['./user-details.component.css'],

  standalone: true,

  imports: [RouterModule, HeaderComponent, CommonModule]

})

export class UserDetailsComponent implements OnInit {

  userId: string = '';


  user : User = {
    id: 0,
    nom: "",
    prenom: "",
    dateCreation: "",
    dateDerniereAccede: "",
    role: "",
    username: ""
  };

  constructor(private route: ActivatedRoute) { }



  ngOnInit(): void {

    // Get the id parameter from the route

    this.route.params.subscribe(params => {

      this.userId = params['id'];

      // Here you can add logic to fetch User details using the ID

    });

  }

}
