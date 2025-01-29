import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-radiologue',
  templateUrl: './radiologue.component.html',
  imports: [RouterModule],
})
export class RadiologueComponent implements OnInit {
  examensCount: number = 0;
  examensEnCours: number = 0;
  examens: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  role: string = 'radiologue';
  currentRadiologue: string = 'John Doe';

  ngOnInit() {
    // Simulate data loading
    setTimeout(() => {
      this.examens = [];
      this.examensCount = 0;
      this.examensEnCours = 0;
      this.isLoading = false;
    }, 1000);
  }
}