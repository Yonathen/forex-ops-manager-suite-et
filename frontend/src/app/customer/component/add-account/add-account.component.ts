import { CommonModule } from '@angular/common';
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Button } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { Subscription } from 'rxjs';
import {BankAccount, BranchDto, CustomerDto} from '../../../../../api';
import {CustomerState} from '../../state/customer.state';
import {addAccountToCustomer} from '../../state/action/customer.action';
import {selectCustomerDetail} from '../../state/selector/customer.selector';
import {createBranchDetail} from '../../../branch/state/action/branch.action';

@Component({
  standalone: true,
  selector: 'app-add-account',
  imports: [
    CommonModule,
    FormsModule,
    InputText,
    Button,
    FloatLabel,
    ReactiveFormsModule,
  ],
  templateUrl: './add-account.component.html'
})
export class AddAccountComponent implements OnInit, OnDestroy {
  public submitted: boolean = false;
  public addAccountMode: boolean = true;
  public addedAccountData: any = null;
  private accountSubscription!: Subscription;
  @Input() customerDetail!: CustomerDto | null;
  @Output() cancelAddAccountDialogEmitter = new EventEmitter<boolean>();
  @Output() afterAddAccountCallbackEmitter = new EventEmitter<void>();

  addAccountForm: FormGroup = new FormGroup({});
  accountDetail!: BankAccount | null;

  constructor(
    private fb: FormBuilder,
    private customerStore: Store<CustomerState>
  ) {}

  ngOnInit() {
    this.setUpForm();

    this.accountSubscription = this.customerStore
      .select(selectCustomerDetail)
      .subscribe((customer: CustomerDto | null) => {
        console.log({ 'this.submitted': this.submitted, customer })
        if (this.submitted && customer) {
          this.submitted = false;
          this.addAccountMode = false;
          this.addedAccountData = this.addedAccount;
          this.afterAddAccountCallbackEmitter.emit();
        }
      });
  }

  ngOnDestroy() {
    this.setUpForm();
    this.accountSubscription?.unsubscribe();
  }

  getFormControl(name: string) {
    return this.addAccountForm.get(name)
  }

  setUpForm() {
    this.addAccountForm = this.fb.group({
      bankName: [ {value: null, disabled: false}, [Validators.required] ],
      accountNumber: [ {value: null, disabled: false}, [Validators.required] ]
    })
  }

  get addedAccount(): BankAccount {
    return this.addAccountForm.value as BankAccount
  }

  addAccount() {
    this.submitted = true;
    const customerId = this.customerDetail?.id;
    if (this.addAccountForm.valid && customerId) {
      this.customerStore.dispatch(addAccountToCustomer({ account: this.addedAccount, customerId }))
    }
  }

  onCancel() {
    this.cancelAddAccountDialogEmitter.emit(false);
  }

  addAnother() {
    this.setUpForm();
    this.addedAccountData = null;
    this.addAccountMode = true;
  }
}
