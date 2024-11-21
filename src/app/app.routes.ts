import { Routes } from '@angular/router';
import { AuthGuard } from './website/core/guards/auth.guard';
import { TodoListComponent } from './website/modules/todo-list/components/todo-list.component';
import { AuthorizationComponent } from './website/auth/authorization/authorization.component';
import { RegistrationComponent } from './website/auth/registration/registration.component';
import { VideoConferenceComponent } from './website/modules/video-conference/video-conference.component';

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
    path: 'todo',
    component: TodoListComponent,
    // loadComponent: () =>
    //   import('./website/modules/todo-list/components/todo-list.component').then(
    //     (p) => p.TodoListComponent
    //   ),
  },
  {
    path: 'dashboard',
    // component: DashboardComponent,
    loadComponent: () =>
      import('./website/modules/dashboard/dashboard.component').then(
        (p) => p.DashboardComponent
      ),
    // canActivate: [AuthGuard],
  },
  {
    path: 'stream',
    component: VideoConferenceComponent,
  },
];
