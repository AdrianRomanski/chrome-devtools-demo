import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'welcome',
    loadComponent: () => import('../../components/welcome').then(m => m.Welcome)
  },
  {
    path: 'register',
    loadComponent: () => import('../../components/register').then(m => m.Register)
  },
  {
    path: 'login',
    loadComponent: () => import('../../components/login').then(m => m.Login)
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  }
];
