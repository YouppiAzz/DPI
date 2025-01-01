import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DpiManagementComponent } from './pages/dpi-management/dpi-management.component';
import { AccountManagementComponent } from './pages/account-management/account-management.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { SettingsComponent } from './pages/settings/settings.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dpi-management', component: DpiManagementComponent },
  { path: 'account-management', component: AccountManagementComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'settings', component: SettingsComponent }
];
