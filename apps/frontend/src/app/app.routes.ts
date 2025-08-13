import { Route } from '@angular/router';
import { UsersComponent } from './users/users.component';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    component: UsersComponent
  }
];
