import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchTerms = new BehaviorSubject<string>('');
  searchTerms$ = this.searchTerms.asObservable();

  updateSearch(term: string) {
    this.searchTerms.next(term);
  }
}
