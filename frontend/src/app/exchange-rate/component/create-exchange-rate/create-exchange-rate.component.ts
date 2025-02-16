import { NgClass } from '@angular/common';
import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Button } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { Subscription } from 'rxjs';
import {Currency, ExchangeRateDto} from '../../../../../api';
import {Select} from 'primeng/select';
import {
  selectAllCurrencies,
  selectExchangeRateDetail
} from '../../../shared/state/selector/global.selector';
import {createExchangeRateDetail} from '../../../shared/state/action/global.actions';
import {DatePickerModule} from 'primeng/datepicker';
import {FloatLabel} from 'primeng/floatlabel';

@Component({
  standalone: true,
  selector: 'app-create-exchange-rate',
  imports: [
    Button,
    DatePickerModule,
    InputNumberModule,
    ReactiveFormsModule,
    NgClass,
    Select,
    FloatLabel
  ],
  templateUrl: './create-exchange-rate.component.html',
  styleUrl: './create-exchange-rate.component.scss'
})
export class CreateExchangeRateComponent implements OnInit, OnDestroy {
  public submitted: boolean = false;
  public createExchangeRateMode: boolean = true;
  public createExchangeRateForm: FormGroup = new FormGroup({});
  public savedExchangeRateData: any = null;
  public currencies: Currency[] = []
  public transactionTypeOptions: { label: string, value: ExchangeRateDto.TransactionTypeEnum }[] = [];
  public currencyOptions: { label?: string, value: Currency }[] = [];

  private exchangeRateSubscription!: Subscription;
  private currencySubscription!: Subscription;

  @Output() cancelCreateExchangeRateDialogEmitter = new EventEmitter<boolean>();
  @Output() afterCreateCallbackEmitter = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.submitted = false;
    this.setUpForm();

    this.exchangeRateSubscription = this.store
      .select(selectExchangeRateDetail)
      .subscribe((exchangeRate: ExchangeRateDto | null) => {
        if (this.submitted && exchangeRate) {
          this.submitted = false;
          this.createExchangeRateMode = false;
          this.savedExchangeRateData = exchangeRate;
          this.afterCreateCallbackEmitter.emit();
        }
      });

    this.currencySubscription = this.store
      .select(selectAllCurrencies)
      .subscribe((currencies) => {
        console.log({ currencies })
        this.currencies = currencies || [];
        this.currencyOptions = this.currencies
          .map(currency => ({ label: currency.currencyCode, value: currency }));
      });

  }

  ngOnDestroy() {
    this.setUpForm();
    this.exchangeRateSubscription?.unsubscribe();
    this.currencySubscription?.unsubscribe();
  }

  get createdExchangeRate(): ExchangeRateDto {
    return this.createExchangeRateForm.value as ExchangeRateDto
  }
  setUpForm() {
    this.transactionTypeOptions = Object.values(ExchangeRateDto.TransactionTypeEnum)
      .map(type => ({ label: type.toLowerCase().replaceAll('_', ' '), value: type }));


    console.log({ 'this.currencyOptions': this.currencyOptions })

    this.createExchangeRateForm = this.fb.group({
      date: [ {value: null, disabled: false}, [Validators.required] ],
      baseCurrency: [ {value: null, disabled: false}, [Validators.required] ],
      targetCurrency: [ {value: null, disabled: false}, [Validators.required]  ],
      rate: [ {value: null, disabled: false}, [Validators.required] ],
      transactionType: [ {value: null, disabled: false}, [Validators.required] ]
    })
  }

  getFormControl(name: string) {
    return this.createExchangeRateForm.get(name)
  }

  onSubmit() {
    this.submitted = true;
    if (this.createExchangeRateForm.valid) {
      this.store.dispatch(createExchangeRateDetail({ createdExchangeRate: this.createdExchangeRate }))
    }
  }

  onCancel() {
    this.cancelCreateExchangeRateDialogEmitter.emit(false);
  }

  addAnother() {
    this.setUpForm();
    this.savedExchangeRateData = null;
    this.createExchangeRateMode = true;
  }
}
