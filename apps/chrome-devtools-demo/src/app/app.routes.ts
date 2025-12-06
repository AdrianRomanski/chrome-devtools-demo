import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'welcome',
    loadComponent: () => import('../../components/welcome').then(m => m.Welcome)
  }
];
