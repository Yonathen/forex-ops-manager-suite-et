import { Routes } from '@angular/router';
import {SigninComponent} from './auth/component/signin/signin.component';
import {SignupComponent} from './auth/component/signup/signup.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PageNotFoundComponent} from './shared/component/page-not-found/page-not-found.component';
import {AuthGuard} from './auth/service/auth-gard.service';
import {OverviewComponent} from './dashboard/component/overview/overview.component';
import {UserComponent} from './user/user/user.component';
import {BranchComponent} from './branch/branch/branch.component';

export const routes: Routes = [
  { path: 'sign-in', component: SigninComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], // Protects the route
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' }, // Default nested route
      { path: 'overview', component: OverviewComponent },
      { path: 'users', component: UserComponent },
      { path: 'branches', component: BranchComponent },
    ],
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
