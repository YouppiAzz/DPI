import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { NgIconComponent } from '@ng-icons/core';
import { dripBell, dripSearch } from '@ng-icons/dripicons';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true,
  imports: [NgIcon, NgIconComponent],
  viewProviders: [provideIcons({ dripBell, dripSearch })]
})
export class HeaderComponent {

}
