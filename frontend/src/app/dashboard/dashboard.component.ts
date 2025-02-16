import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { MenuModule } from 'primeng/menu';
import { PanelMenu } from 'primeng/panelmenu';
import { Observable } from 'rxjs';
import { UserPublicDto } from '../../../api';
import { AuthService } from '../auth/service/auth.service';
import { loadCurrentUser } from '../shared/state/action/global.actions';
import { GlobalState } from '../shared/state/global.state';
import { selectCurrentUser, selectCurrentUserLoading } from '../shared/state/selector/global.selector';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterOutlet,
    PanelMenu,
    MenuModule,
    BadgeModule,
    CommonModule
  ],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent  implements OnInit {
  pageNavigationItems: MenuItem[] = [];
  userMenuItems: MenuItem[] = [];

  user$!: Observable<UserPublicDto | null>;
  userLoading$!: Observable<boolean>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<GlobalState>
  ) {}

  ngOnInit() {
    this.setMenuItems();
    const id = this.authService.getCurrentUserId();
    id && this.store.dispatch(loadCurrentUser({ id }));
    this.store.select(selectCurrentUser).subscribe(user => console.log({ user }));
    this.user$ = this.store.select(selectCurrentUser);
    this.userLoading$ = this.store.select(selectCurrentUserLoading)
  }

  setMenuItems() {
    this.pageNavigationItems = [
      {
        label: 'Dashboard',
        icon: 'home',
        command: () => this.router.navigateByUrl('/dashboard/overview')
      },
      {
        label: 'Users',
        icon: 'support_agent',
        command: () => this.router.navigateByUrl('/dashboard/users')
      },
      {
        label: 'Branches',
        icon: 'store',
        command: () => this.router.navigateByUrl('/dashboard/branches')
      },
      {
        label: 'Customers',
        icon: 'person',
        command: () => this.router.navigateByUrl('/dashboard/customers')
      },
      {
        label: 'Reports',
        icon: 'equalizer',
        command: () => this.router.navigateByUrl('/dashboard/reports')
      },
    ];

    this.userMenuItems = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
        command: () => this.router.navigateByUrl('/dashboard/profile')
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => this.authService.logout()
      }
    ]
  }

}
