import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { BranchDto, PermissionDto, UserPublicDto } from '../../../../../api';
import { removeUserFromBranch } from '../../state/action/branch.action';
import { BranchState } from '../../state/branch.state';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-users',
  imports: [
    TableModule,
    TagModule,
    ButtonModule,
    DialogModule,
    CommonModule,
    AddUserComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  @Input() branchDetail!: BranchDto | null;
  @Input() users: Set<UserPublicDto> = new Set([]);
  isAddUserDialogVisible: boolean = false;

  constructor(
    private store: Store<BranchState>
  ) {}

  get usersArray() {
    return Array.from(this.users);
  }
  isReadAccess(access: PermissionDto.AccessEnum) {
    return access === PermissionDto.AccessEnum.Read;
  }

  setCreateBranchDialogVisibility(visible: boolean = true) {
    this.isAddUserDialogVisible = visible;
  }

  removeUserFromBranch(user: UserPublicDto) {
    const userId = user.id;
    const branchId = this.branchDetail?.id;
    if (userId && branchId) {
      this.store.dispatch(removeUserFromBranch({ branchId, userId }))
    }
  }
}
