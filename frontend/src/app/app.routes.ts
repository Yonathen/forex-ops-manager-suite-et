import { Routes } from '@angular/router';
import { SigninComponent } from './auth/component/signin/signin.component';
import { SignupComponent } from './auth/component/signup/signup.component';
import { AuthGuard } from './auth/service/auth-gard.service';
import { BranchComponent } from './branch/branch.component';
import { BranchDetailComponent } from './branch/component/branch-detail/branch-detail.component';
import { OverviewComponent } from './dashboard/component/overview/overview.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportComponent } from './report/report.component';
import { PageNotFoundComponent } from './shared/component/page-not-found/page-not-found.component';
import { ProfileComponent } from './user/component/profile/profile.component';
import { UserDetailComponent } from './user/component/user-detail/user-detail.component';
import { UserComponent } from './user/user.component';
import {CustomerComponent} from './customer/customer.component';
import {CustomerDetailComponent} from './customer/component/customer-detail/customer-detail.component';
import {ExchangeRateComponent} from './exchange-rate/exchange-rate.component';
import {
  ExchangeRateDetailComponent
} from './exchange-rate/component/exchange-rate-detail/exchange-rate-detail.component';

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
      { path: 'users/:id', component: UserDetailComponent },
      { path: 'branches', component: BranchComponent },
      { path: 'branches/:id', component: BranchDetailComponent },
      { path: 'customers', component: CustomerComponent },
      { path: 'customers/:id', component: CustomerDetailComponent },
      { path: 'exchange-rates', component: ExchangeRateComponent },
      { path: 'exchange-rates/:id', component: ExchangeRateDetailComponent },
      { path: 'reports', component: ReportComponent },
      { path: 'profile', component: ProfileComponent }
    ],
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
