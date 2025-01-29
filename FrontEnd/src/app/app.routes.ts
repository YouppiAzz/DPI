import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

import { DpiManagementComponent } from './pages/dpi-management/dpi-management.component';
import { CreerDossierComponent } from './pages/dpi-management/creer-dossier/creer-dossier.component';
import { DossierDetailsComponent } from './pages/dpi-management/dossier-details/dossier-details.component';

import { AccountManagementComponent } from './pages/account-management/account-management.component';
import { CreerUserComponent } from './pages/account-management/creer-user/creer-user.component';
import { UserDetailsComponent } from './pages/account-management/user-details/user-details.component';

import { NotificationsComponent } from './pages/notifications/notifications.component';
import { SettingsComponent } from './pages/settings/settings.component';

import { LoginComponent } from './pages/auth/login.component';
import { SignupComponent } from './pages/auth/signup.component';

import { MedecinHomeComponent } from './pages/Medecin/home/home.component';
import { AuthGuard } from './pages/auth/auth.guard';
import { InfirmierHomeComponent } from './pages/infirmier/infirmier.component';
import { BilanradioComponent } from './pages/Medecin/home/bilanradio.component';
import { BilanlaboratoireComponent } from './pages/Medecin/home/bilanlaboratoire.component';
import { OrdonnanceComponent } from './pages/Medecin/home/ordonnance.component';
import { DossierDetailsMedecinComponent } from './pages/Medecin/home/dossier-details/dossier-details.component';
import { LaborantinComponent } from './pages/laborantin/laborantin.component';
import { RadiologueComponent } from './pages/radiologue/radiologue.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },

  { path: 'dpi-management', component: DpiManagementComponent },
  { path: 'dpi-management/creer-dossier', component: CreerDossierComponent },
  { path: 'dpi-management/dossier/:id', component: DossierDetailsComponent },

  { path: 'account-management', component: AccountManagementComponent },
  { path: 'account-management/creer-user', component: CreerUserComponent },
  { path: 'account-management/user/:id', component: UserDetailsComponent },

  { path: 'notifications', component: NotificationsComponent },
  { path: 'settings', component: SettingsComponent },
  {
    path: 'medecin/home',
    component: MedecinHomeComponent,
    canActivate: [AuthGuard],
    data: { requiredRole: 'Médecin' },
  },
  { path: 'medecin/bilanradio', component: BilanradioComponent },
  { path: 'medecin/bilanlaboratoire', component: BilanlaboratoireComponent },
  { path: 'medecin/ordonance', component: OrdonnanceComponent },
  { path: 'medecin/dossier/:id', component: DossierDetailsMedecinComponent },

  { path: 'laborantin/home', component: LaborantinComponent },
  { path: 'laborantin/bilanlaboratoire', component: BilanlaboratoireComponent },

  { path: 'radiologue/home', component: RadiologueComponent },
  { path: 'radiologue/bilanradio', component: BilanradioComponent },

  {
    path: 'infirmier',
    component: InfirmierHomeComponent,
    canActivate: [AuthGuard],
    data: {requiredRole: 'Infirmier' }
  }

];
