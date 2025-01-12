import { Routes } from '@angular/router';
import {SigninComponent} from './auth/component/signin/signin.component';
import {SignupComponent} from './auth/component/signup/signup.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PageNotFoundComponent} from './shared/component/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: 'sign-in', component: SigninComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
