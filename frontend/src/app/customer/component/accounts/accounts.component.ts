import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import {AddAccountComponent} from '../add-account/add-account.component';
import {BankAccount, CustomerDto, PermissionDto} from '../../../../../api';
import {CustomerState} from '../../state/customer.state';
import {removeAccountFromCustomer} from '../../state/action/customer.action';

@Component({
  standalone: true,
  selector: 'app-accounts',
  imports: [
    TableModule,
    TagModule,
    ButtonModule,
    DialogModule,
    CommonModule,
    AddAccountComponent
  ],
  templateUrl: './accounts.component.html'
})
export class AccountsComponent {

  @Input() customerDetail!: CustomerDto | null;
  @Input() accounts: Set<BankAccount> = new Set([]);
  isAddAccountDialogVisible: boolean = false;

  constructor(
    private store: Store<CustomerState>
  ) {}

  get accountsArray() {
    return Array.from(this.accounts);
  }
  isReadAccess(access: PermissionDto.AccessEnum) {
    return access === PermissionDto.AccessEnum.Read;
  }

  setCreateCustomerDialogVisibility(visible: boolean = true) {
    this.isAddAccountDialogVisible = visible;
  }

  removeAccountFromCustomer(account: BankAccount) {
    const accountId = account.id;
    const customerId = this.customerDetail?.id;
    if (accountId && customerId) {
      this.store.dispatch(removeAccountFromCustomer({ customerId, accountId }))
    }
  }
}
