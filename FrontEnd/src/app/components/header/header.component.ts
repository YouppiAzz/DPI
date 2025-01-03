import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { NgIconComponent } from '@ng-icons/core';
import { dripBell, dripSearch } from '@ng-icons/dripicons';
import { SearchService } from '../../shared/search.service';
import { Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true,
  imports: [NgIcon, NgIconComponent, NgIf, RouterModule],
  viewProviders: [provideIcons({ dripBell, dripSearch })]
})
export class HeaderComponent {

  @Input() pageName : string = "";

  @Input() isSearchActive: boolean = true;

  constructor(private searchService: SearchService) {}

  onSearch(event: any) {
    this.searchService.updateSearch(event.target.value);
  }
}
