import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { Subscription } from 'rxjs';
import { BranchDto, UserPublicDto } from '../../../../../api';
import { EBranchItem } from '../../enum/branch-item';
import { fetchBranchById, updateBranchDetail } from '../../state/action/branch.action';
import { BranchState } from '../../state/branch.state';
import { selectBranchDetail, selectBranchDetailLoading } from '../../state/selector/branch.selector';

import { AddressComponent } from '../../../shared/component/address/address.component';
import { BranchItemComponent } from '../branch-item/branch-item.component';
import { UsersComponent } from '../users/users.component';


@Component({
  standalone: true,
  selector: 'app-branch-detail',
  imports: [
    CommonModule,
    TagModule,
    DropdownModule,
    BranchItemComponent,
    UsersComponent,
    AddressComponent
  ],
  templateUrl: './branch-detail.component.html',
  styleUrl: './branch-detail.component.scss'
})
export class BranchDetailComponent implements OnInit, OnDestroy {

  branchDetail!: BranchDto | null;
  branchDetailLoading!: boolean;
  branchDetailUsers: Set<UserPublicDto> = new Set([]);
  branchSubscription!: Subscription;
  branchSubscriptionLoading!: Subscription;
  itemInEditMode: EBranchItem | null = null;
  items = EBranchItem;

  constructor(
    private route: ActivatedRoute,
    private store: Store<BranchState>
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      id && this.store.dispatch(fetchBranchById({ id }));
    });
    this.branchSubscription = this.store.select(selectBranchDetail).subscribe(branchDetail => {
      this.branchDetail = branchDetail
      this.branchDetailUsers = branchDetail?.users || new Set([])
    });
    this.branchSubscriptionLoading = this.store.select(selectBranchDetailLoading)
      .subscribe(loading => this.branchDetailLoading = loading)
  }

  ngOnDestroy(): void {
    if (this.branchSubscription) this.branchSubscription.unsubscribe();
    if (this.branchSubscriptionLoading) this.branchSubscriptionLoading.unsubscribe();
  }

  setItemInEditMode(item: EBranchItem | null) {
    this.itemInEditMode = item;
  }

  updateBranchItem(item?: string) {
    const keyIndex = Object.values(this.items)
      .findIndex(value => this.itemInEditMode === value);

    if ( this.branchDetail && keyIndex >= 0 ) {
      const key = Object.keys(this.items)[keyIndex]
      const updatedBranch = { ...this.branchDetail, [key]: item }
      this.store.dispatch(updateBranchDetail({ updatedBranch }))

      this.itemInEditMode = null;
    }
  }

  updateAddressItem({ key, value }: { key: string, value?: string }) {
    const currentAddress = this.branchDetail?.address;
    const updatedBranch = { ...this.branchDetail, address: { ...currentAddress, [key]: value } };
    this.store.dispatch(updateBranchDetail({ updatedBranch }))
  }
}
