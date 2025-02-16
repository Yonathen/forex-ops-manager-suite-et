import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { Subscription } from 'rxjs';
import {BankAccount, CustomerDto, UserPublicDto} from '../../../../../api';
import { ECustomerItem } from '../../enum/customer-item';
import { fetchCustomerById, updateCustomerDetail } from '../../state/action/customer.action';
import { CustomerState } from '../../state/customer.state';
import { selectCustomerDetail, selectCustomerDetailLoading } from '../../state/selector/customer.selector';

import { AddressComponent } from '../../../shared/component/address/address.component';
import { CustomerItemComponent } from '../customer-item/customer-item.component';
import {AccountsComponent} from '../accounts/accounts.component';


@Component({
  standalone: true,
  selector: 'app-customer-detail',
  imports: [
    CommonModule,
    TagModule,
    DropdownModule,
    CustomerItemComponent,
    AccountsComponent,
    AddressComponent
  ],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.scss'
})
export class CustomerDetailComponent implements OnInit, OnDestroy {

  customerDetail!: CustomerDto | null;
  customerDetailLoading!: boolean;
  customerSubscription!: Subscription;
  customerSubscriptionLoading!: Subscription;
  itemInEditMode: ECustomerItem | null = null;
  items = ECustomerItem;

  constructor(
    private route: ActivatedRoute,
    private store: Store<CustomerState>
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      id && this.store.dispatch(fetchCustomerById({ id }));
    });
    this.customerSubscription = this.store.select(selectCustomerDetail).subscribe(customerDetail => {
      this.customerDetail = customerDetail
    });
    this.customerSubscriptionLoading = this.store.select(selectCustomerDetailLoading)
      .subscribe(loading => this.customerDetailLoading = loading)
  }

  ngOnDestroy(): void {
    if (this.customerSubscription) this.customerSubscription.unsubscribe();
    if (this.customerSubscriptionLoading) this.customerSubscriptionLoading.unsubscribe();
  }

  get accounts() {
    return this.customerDetail?.bankAccounts || new Set<BankAccount>([]);
  }

  setItemInEditMode(item: ECustomerItem | null) {
    this.itemInEditMode = item;
  }

  updateCustomerItem(item?: string) {
    const keyIndex = Object.values(this.items)
      .findIndex(value => this.itemInEditMode === value);

    if ( this.customerDetail && keyIndex >= 0 ) {
      const key = Object.keys(this.items)[keyIndex]
      const updatedCustomer = { ...this.customerDetail, [key]: item }
      this.store.dispatch(updateCustomerDetail({ updatedCustomer }))

      this.itemInEditMode = null;
    }
  }

  updateAddressItem({ key, value }: { key: string, value?: string }) {
    const currentAddress = this.customerDetail?.address;
    const updatedCustomer = { ...this.customerDetail, address: { ...currentAddress, [key]: value } };
    this.store.dispatch(updateCustomerDetail({ updatedCustomer }))
  }
}
