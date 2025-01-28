import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  dripHome,
  dripFolder,
  dripUserGroup,
  dripBell,
  dripGear,
  dripExit,
} from '@ng-icons/dripicons';
import { RouterModule } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { AuthService } from '../../pages/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrl: './navbar.component.css',
  imports: [NgIcon, RouterModule, NgIconComponent],
  viewProviders: [
    provideIcons({
      dripHome,
      dripFolder,
      dripUserGroup,
      dripBell,
      dripGear,
      dripExit,
    }),
  ],
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  getRoute(basePath: string): string {
    const user = this.authService.currentUserValue;
    if (user?.role === 'Médecin') {
      return `/medecin${basePath}`;
    }
    return basePath;
  }

  isAdmin(): boolean {
    const user = this.authService.currentUserValue;
    return user?.role === 'admin';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
