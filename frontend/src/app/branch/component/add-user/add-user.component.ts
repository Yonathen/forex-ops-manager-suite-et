import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Button } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { Subscription } from 'rxjs';
import { BranchDto, UserPublicDto } from '../../../../../api';
import { fetchUserByUsername } from '../../../user/state/action/user.action';
import { selectUserDetail } from '../../../user/state/selector/user.selector';
import { UserState } from '../../../user/state/user.state';
import { addUserToBranch } from '../../state/action/branch.action';
import { BranchState } from '../../state/branch.state';

@Component({
  selector: 'app-add-user',
  imports: [
    CommonModule,
    FormsModule,
    InputText,
    Button,
    FloatLabel,
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements OnInit {
  @Input() branchDetail!: BranchDto | null;

  searched: boolean = false;
  userDetail!: UserPublicDto | null;
  username?: string;
  userSubscription!: Subscription;
  userSubscriptionLoading!: Subscription;

  constructor(
    private userStore: Store<UserState>,
    private branchStore: Store<BranchState>
  ) {}

  ngOnInit() {
    this.userSubscription = this.userStore.select(selectUserDetail).subscribe(userDetail => {
      this.userDetail = userDetail
    });
  }

  onSearch() {
    this.searched = true;
    if (!this.username) return;

    this.userStore.dispatch(fetchUserByUsername({ username: this.username }));
  }
  
  addUser() {
    const userId = this.userDetail?.id;
    const branchId = this.branchDetail?.id;
    if (!userId || !branchId) return;

    this.branchStore.dispatch(addUserToBranch({ userId, branchId }))
    this.searched = false;
    this.username = undefined;
  }
}
