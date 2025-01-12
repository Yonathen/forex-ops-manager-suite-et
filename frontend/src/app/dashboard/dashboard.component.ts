import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {PanelMenu} from 'primeng/panelmenu';
import {BadgeModule} from 'primeng/badge';
import {CommonModule} from '@angular/common';
import {MenuItem, MenuItemCommandEvent} from 'primeng/api';
import {AuthService} from '../auth/service/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterOutlet,
    PanelMenu,
    BadgeModule,
    CommonModule
  ],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent  implements OnInit {
  items: MenuItem[] = [];

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Users',
        icon: 'pi pi-users',
        command: () => this.router.navigateByUrl('/dashboard/users')
      },
      {
        label: 'Branches',
        icon: 'pi pi-home',
        command: () => this.router.navigateByUrl('/dashboard/branches')
      },
      {
        label: 'Reports',
        icon: 'pi pi-chart-bar'
      },
      {
        label: 'Logout',
        icon: 'pi pi-user',
        command: () => this.authService.logout()
      }
    ];
  }

}
