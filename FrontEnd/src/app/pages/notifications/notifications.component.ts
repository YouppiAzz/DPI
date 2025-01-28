import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterModule } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { DatePipe } from '@angular/common';

export interface Notification {

  id: number;
  type: string;
  message: string;
  date: Date;
  time: string;

}

@Component({
  selector: 'app-notifications',
  imports: [HeaderComponent, NgIf, NgFor, RouterModule, DatePipe],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})

export class NotificationsComponent {

  notifications: Notification[] = [
    {
      id: 1,
      type: 'info',
      message: 'New message received',
      date: new Date('2024-01-03'),
      time: '09:30'
    },
    {
      id: 2, 
      type: 'warning',
      message: 'Your subscription will expire soon',
      date: new Date('2024-01-03'),
      time: '10:15'
    },
    {
      id: 3,
      type: 'success',
      message: 'Payment processed successfully',
      date: new Date('2024-01-03'),
      time: '11:45'
    }
  ]

  count = this.notifications.length;

}
