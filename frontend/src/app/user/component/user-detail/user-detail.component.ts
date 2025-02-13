import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { Subscription } from 'rxjs';
import { RoleDto, UserPublicDto } from '../../../../../api';
import { EProfileItem } from '../../enum/profile-item';
import { fetchUserById, updateUserDetail } from '../../state/action/user.action';
import { selectUserDetail, selectUserDetailLoading } from '../../state/selector/user.selector';
import { UserState } from '../../state/user.state';
import { ProfileItemComponent } from '../profile-item/profile-item.component';
import { RolesComponent } from '../roles/roles.component';
import { UserStatusComponent } from '../user-status/user-status.component';

@Component({
  selector: 'app-user-detail',
  imports: [
    CommonModule,
    TagModule,
    DropdownModule,
    ProfileItemComponent,
    RolesComponent,
    UserStatusComponent
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit, OnDestroy {

  userDetail!: UserPublicDto | null;
  userDetailLoading!: boolean;
  userDetailRoles: RoleDto[] = [];
  userSubscription!: Subscription;
  userSubscriptionLoading!: Subscription;
  itemInEditMode: EProfileItem | null = null;
  items = EProfileItem;

  constructor(
    private route: ActivatedRoute,
    private store: Store<UserState>
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      id && this.store.dispatch(fetchUserById({ id }));
    });
    this.userSubscription = this.store.select(selectUserDetail).subscribe(userDetail => {
      this.userDetail = userDetail
      this.userDetailRoles = Array.from(userDetail?.roles || [])
    });
    this.userSubscriptionLoading = this.store.select(selectUserDetailLoading)
      .subscribe(loading => this.userDetailLoading = loading)
  }

  ngOnDestroy(): void {
    if (this.userSubscription) this.userSubscription.unsubscribe();
    if (this.userSubscriptionLoading) this.userSubscriptionLoading.unsubscribe();
  }

  setItemInEditMode(item: EProfileItem | null) {
    this.itemInEditMode = item;
  }

  updateProfileItem(item?: string) {
    const keyIndex = Object.values(this.items)
      .findIndex(value => this.itemInEditMode === value);

    if ( this.userDetail && keyIndex >= 0 ) {
      const key = Object.keys(this.items)[keyIndex]
      const updatedUser = { ...this.userDetail, [key]: item }
      this.store.dispatch(updateUserDetail({ updatedUser }))

      this.itemInEditMode = null;
    }
  }
}
