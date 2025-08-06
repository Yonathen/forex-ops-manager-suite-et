import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Observable, Subscription } from 'rxjs';
import { RoleDto, UserPublicDto } from '../../../../../api';
import { updateCurrentUser } from '../../../shared/state/action/global.actions';
import { selectCurrentUser } from '../../../shared/state/selector/global.selector';
import { EProfileItem } from '../../enum/profile-item';
import { UserState } from '../../state/user.state';
import { ProfileItemComponent } from '../profile-item/profile-item.component';
import { RolesComponent } from '../roles/roles.component';

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [
    TableModule,
    CommonModule,
    TagModule,
    ProfileItemComponent,
    RolesComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit, OnDestroy {
  user$!: Observable<UserPublicDto | null>;
  currentUser: UserPublicDto | null = null;
  currentUserRoles: RoleDto[] = [];
  private userSubscription!: Subscription;
  itemInEditMode: EProfileItem | null = null;
  items = EProfileItem;

  constructor(
    private store: Store<UserState>
  ) {}

  isActive(status?: UserPublicDto.StatusEnum) {
    return status === UserPublicDto.StatusEnum.Active;
  }

  ngOnInit() {
    this.user$ = this.store.select(selectCurrentUser);

    this.userSubscription = this.store
      .select(selectCurrentUser)
      .subscribe((user) => {
        this.currentUser = user; // Store the current user
        this.currentUserRoles = Array.from(user?.roles || [])
      });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe(); // Unsubscribe to avoid memory leaks
    }
  }

  setItemInEditMode(item: EProfileItem | null) {
    this.itemInEditMode = item;
  }

  updateProfileItem(item?: string) {
    const keyIndex = Object.values(this.items)
      .findIndex(value => this.itemInEditMode === value);

    if ( this.currentUser && keyIndex >= 0 ) {
      const key = Object.keys(this.items)[keyIndex]
      const updatedUser = { ...this.currentUser, [key]: item }
      this.store.dispatch(updateCurrentUser({ updatedUser }))

      this.itemInEditMode = null;
    }
  }
}
