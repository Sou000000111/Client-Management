import { Routes } from '@angular/router';
import { AuthGuard } from './auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login').then(m => m.Login)
  },

  {
    path: 'clients',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./components/client-list/client-list.component').then(m => m.ClientListComponent)
  },

  {
    path: 'create-client',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./components/client-create/client-create.component').then(m => m.ClientCreateComponent)
  },

  {
    path: 'meetings',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./components/meeting-list/meeting-list.component').then(m => m.MeetingListComponent)
  },

  {
    path: 'create-meeting',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./components/meeting-create/meeting-create.component').then(m => m.MeetingCreateComponent)
  },

  { path: '**', redirectTo: 'login' }
];
