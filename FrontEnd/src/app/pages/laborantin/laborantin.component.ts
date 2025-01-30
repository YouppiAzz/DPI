// laborantin.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-laborantin',
  templateUrl: './laborantin.component.html',
  imports: [RouterModule],
})
export class LaborantinComponent implements OnInit {
  bilansCount: number = 0;
  examensEnCours: number = 0;
  bilans: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  role: string = 'laborantin';
  currentLaborantin: string = 'John Doe';

  ngOnInit() {
    // Simulate data loading
    setTimeout(() => {
      this.bilans = [];
      this.bilansCount = 0;
      this.examensEnCours = 0;
      this.isLoading = false;
    }, 1000);
  }
}