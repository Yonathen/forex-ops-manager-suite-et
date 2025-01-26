import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Observable, Subscription } from 'rxjs';
import { UserPublicDto } from '../../../../../api';
import { selectCurrentUser } from '../../../shared/state/selector/global.selector';
import { EProfileItem } from '../../enum/profile-item';
import { updateUser } from '../../state/action/user.action';
import { UserState } from '../../state/user.state';
import { ProfileItemComponent } from '../profile-item/profile-item.component';

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [
    TableModule,
    CommonModule,
    TagModule,
    ProfileItemComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user$!: Observable<UserPublicDto | null>;
  currentUser: UserPublicDto | null = null;
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
      this.store.dispatch(updateUser({ updatedUser }))

      this.itemInEditMode = null;
    }
  }
}
