import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component'

@Component({
  selector: 'app-dpi-management',
  imports: [HeaderComponent],
  templateUrl: './dpi-management.component.html',
  styleUrl: './dpi-management.component.css'
})
export class DpiManagementComponent {
  count = 0;
}
