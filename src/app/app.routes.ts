import { Routes } from '@angular/router';
import { AuthorizationComponent } from './authorization/authorization.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from '../custom-guard/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: 'authorization',
    component: AuthorizationComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // loadComponent: () =>
    //   import('./dashboard/dashboard.component').then(
    //     (p) => p.DashboardComponent
    //   ),
    canActivate: [AuthGuard],
  },
];
