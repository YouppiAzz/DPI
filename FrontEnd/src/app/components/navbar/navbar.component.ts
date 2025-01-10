import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { dripHome, dripFolder, dripUserGroup, dripBell, dripGear, dripExit } from '@ng-icons/dripicons';
import { RouterModule } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrl: './navbar.component.css',
  imports: [NgIcon, RouterModule, NgIconComponent],
  viewProviders: [provideIcons({ dripHome, dripFolder, dripUserGroup, dripBell, dripGear, dripExit })]
})
export class NavbarComponent {
  
}
