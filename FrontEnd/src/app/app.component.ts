import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component'
import { Router } from '@angular/router';

import { NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, NgClass, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private router: Router) {}

  isAuthRoute(): boolean {
    const currentRoute = this.router.url;
    return currentRoute === '/login' || 
           currentRoute === '/signup' || 
           currentRoute.startsWith('/auth/');
  }
}
