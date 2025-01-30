import { Component, OnInit } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { NgIconComponent } from '@ng-icons/core';
import { dripBell, dripSearch } from '@ng-icons/dripicons';
import { SearchService } from '../../shared/search.service';
import { Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../pages/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true,
  imports: [NgIcon, NgIconComponent, NgIf, RouterModule],
  viewProviders: [provideIcons({ dripBell, dripSearch })],
})
export class HeaderComponent implements OnInit {
  userName: string = '';
  userRole: string = '';
  @Input() pageName: string = '';

  @Input() isSearchActive: boolean = true;

  // @Input() userName: string = '';

  // @Input() userRole: string = '';

  constructor(
    private searchService: SearchService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Fetch user details from AuthService
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.userName = `${currentUser.nom} ${currentUser.prenom}`;
      this.userRole = currentUser.user_type;
    }
  }

  onSearch(event: any) {
    this.searchService.updateSearch(event.target.value);
  }
}
