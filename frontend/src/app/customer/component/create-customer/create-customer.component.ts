import { NgClass } from '@angular/common';
import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Button } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { InputText } from 'primeng/inputtext';
import { Subscription } from 'rxjs';
import {CustomerDto, User, UserPublicDto} from '../../../../../api';
import { UserState } from '../../../user/state/user.state';
import { createCustomerDetail } from '../../state/action/customer.action';
import { selectCustomerDetail } from '../../state/selector/customer.selector';
import {Select} from 'primeng/select';
import {selectCurrentUser} from '../../../shared/state/selector/global.selector';

@Component({
  standalone: true,
  selector: 'app-create-customer',
  imports: [
    Button,
    FloatLabel,
    InputText,
    DatePickerModule,
    ReactiveFormsModule,
    NgClass,
    Select
  ],
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.scss'
})
export class CreateCustomerComponent implements OnInit, OnDestroy {
  public submitted: boolean = false;
  public createCustomerMode: boolean = true;
  createCustomerForm: FormGroup = new FormGroup({});
  savedCustomerData: any = null;
  currentUser: UserPublicDto | null = null;
  identificationTypeOptions: { label: string, value: CustomerDto.IdentificationTypeEnum }[] = [];
  private customerSubscription!: Subscription;
  private userSubscription!: Subscription;
  @Output() cancelCreateCustomerDialogEmitter = new EventEmitter<boolean>();
  @Output() afterCreateCallbackEmitter = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.submitted = false;
    this.setUpForm();

    this.customerSubscription = this.store
      .select(selectCustomerDetail)
      .subscribe((customer: CustomerDto | null) => {
        if (this.submitted && customer) {
          this.submitted = false;
          this.createCustomerMode = false;
          this.savedCustomerData = customer;
          this.afterCreateCallbackEmitter.emit();
        }
      });
    this.userSubscription = this.store
      .select(selectCurrentUser)
      .subscribe((user) => {
        this.currentUser = user;
      });
  }

  ngOnDestroy() {
    this.setUpForm();
    this.customerSubscription?.unsubscribe();
  }

  get createdCustomer(): CustomerDto {
    return {
      ...this.createCustomerForm.value as CustomerDto,
      user: this.currentUser as User // TODO this should be removed when we regenerate the API
    }
  }
  setUpForm() {
    this.identificationTypeOptions = Object.values(CustomerDto.IdentificationTypeEnum)
      .map(type => ({ label: type.toLowerCase().replaceAll('_', ' '), value: type }));
    this.createCustomerForm = this.fb.group({
      firstName: [ {value: null, disabled: false}, [Validators.required] ],
      middleName: [ {value: null, disabled: false}, [] ],
      lastName: [ {value: null, disabled: false}, [Validators.required] ],
      dateOfBirth: [ {value: null, disabled: false}, [Validators.required] ],
      identificationType: [ {value: null, disabled: false}, [Validators.required] ],
      identificationNumber: [ {value: null, disabled: false}, [Validators.required] ],
    })
  }

  getFormControl(name: string) {
    return this.createCustomerForm.get(name)
  }

  onSubmit() {
    this.submitted = true;
    if (this.createCustomerForm.valid) {
      this.store.dispatch(createCustomerDetail({ createdCustomer: this.createdCustomer }))
    }
  }

  onCancel() {
    this.cancelCreateCustomerDialogEmitter.emit(false);
  }

  addAnother() {
    this.setUpForm();
    this.savedCustomerData = null;
    this.createCustomerMode = true;
  }
}
