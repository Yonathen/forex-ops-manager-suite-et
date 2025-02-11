import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { PermissionDto, RoleDto, UserPublicDto } from '../../../../../api';
import { removeRoleFromUser } from '../../state/action/user.action';
import { UserState } from '../../state/user.state';
import { AddRoleComponent } from '../add-role/add-role.component';

@Component({
  selector: 'app-roles',
  imports: [
    TableModule,
    TagModule,
    ButtonModule,
    DialogModule,
    CommonModule,
    AddRoleComponent
  ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent {

  @Input() userDetail!: UserPublicDto | null;
  @Input() roles: RoleDto[] = [];
  isAddRoleDialogVisible: boolean = false;

  constructor(
    private store: Store<UserState>
  ) {}

  isReadAccess(access: PermissionDto.AccessEnum) {
    return access === PermissionDto.AccessEnum.Read;
  }

  setCreateUserDialogVisibility(visible: boolean = true) {
    this.isAddRoleDialogVisible = visible;
  }

  removeRoleFromUser(role: RoleDto) {
    const roleId = role.id;
    const userId = this.userDetail?.id;
    if (roleId && userId) {
      this.store.dispatch(removeRoleFromUser({ userId, roleId }))
    }
  }
}
