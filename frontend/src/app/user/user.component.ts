import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Menu, MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { Subscription } from 'rxjs';
import { PaginatedResponseDTOUserPublicDto, RoleDto, UserPublicDto } from '../../../api';
import { CreateUserComponent } from './component/create-user/create-user.component';
import { fetchAllUsers } from './state/action/user.action';
import { selectAllUsers } from './state/selector/user.selector';
import { UserState } from './state/user.state';

@Component({
  standalone: true,
  selector: 'app-user',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    MenuModule,
    DialogModule,
    CreateUserComponent
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit, OnDestroy {

  @ViewChild('menu')
  menu!: Menu;

  selectedUser!: UserPublicDto;

  paginatedResponse!: PaginatedResponseDTOUserPublicDto | null;
  users: Array<UserPublicDto> = [];
  roles: Array<RoleDto> = [];
  totalRecords: number = 0;
  rows: number = 20;
  loading: boolean = false;
  private userSubscription!: Subscription;

  rowMenuItems: MenuItem[] = [];
  isCreateUserDialogVisible: boolean = false;

  constructor(
    private store: Store<UserState>,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.setMenuItems()
    this.loadUsers();

    this.userSubscription = this.store
      .select(selectAllUsers)
      .subscribe((paginatedResponse) => {
        this.paginatedResponse = paginatedResponse;
        this.users = paginatedResponse?.content || [];
        this.totalRecords = paginatedResponse?.total || 0;
      });
  }

  ngOnDestroy(): void {
    this.userSubscription && this.userSubscription.unsubscribe();
  }

  setMenuItems() {
    this.rowMenuItems = [
      {
        label: 'Open detail',
        icon: 'open_in_new',
        command: () => this.viewUserDetail()
      },
      {
        label: 'Remove user',
        icon: 'delete',
        command: () => {}
      }
    ];
  }

  loadUsers({ first = 0, rows = 20 }: any = {}) {
    const page = first / rows;
    const size = rows;
    this.store.dispatch(fetchAllUsers({ page, size }))
  }

  setCreateUserDialogVisibility(visible: boolean = true) {
    this.isCreateUserDialogVisible = visible;
  }

  afterCreateCallback() {
    this.loadUsers({ first: 0, rows: this.rows });
    this.setCreateUserDialogVisibility(false);
  }

  toggleMenu(event: any, user: any) {
    this.selectedUser = user;
    this.menu.toggle(event);
  }

  viewUserDetail() {
    if (this.selectedUser) {
      this.router.navigate([ '/dashboard/users', this.selectedUser.id ])
    }
  }
}
