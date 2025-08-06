import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { Subscription } from 'rxjs';
import {BankAccount, ExchangeRateDto, UserPublicDto} from '../../../../../api';
import {ExchangeRateItemComponent} from '../exchange-rate-item/exchange-rate-item.component';
import {EExchangeRateItem} from '../../enum/exchange-rate-item';
import {GlobalState} from '../../../shared/state/global.state';
import {fetchExchangeRateById, updateExchangeRateDetail} from '../../../shared/state/action/global.actions';
import {
  selectExchangeRateDetail,
  selectExchangeRateDetailLoading
} from '../../../shared/state/selector/global.selector';


@Component({
  standalone: true,
  selector: 'app-exchangeRate-detail',
  imports: [
    CommonModule,
    TagModule,
    DropdownModule,
    ExchangeRateItemComponent,
  ],
  templateUrl: './exchange-rate-detail.component.html',
  styleUrl: './exchange-rate-detail.component.scss'
})
export class ExchangeRateDetailComponent implements OnInit, OnDestroy {

  exchangeRateDetail!: ExchangeRateDto | null;
  exchangeRateDetailLoading!: boolean;
  exchangeRateSubscription!: Subscription;
  exchangeRateSubscriptionLoading!: Subscription;
  itemInEditMode: EExchangeRateItem | null = null;
  items = EExchangeRateItem;

  constructor(
    private route: ActivatedRoute,
    private store: Store<GlobalState>
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      id && this.store.dispatch(fetchExchangeRateById({ id }));
    });
    this.exchangeRateSubscription = this.store.select(selectExchangeRateDetail).subscribe(exchangeRateDetail => {
      this.exchangeRateDetail = exchangeRateDetail
    });
    this.exchangeRateSubscriptionLoading = this.store.select(selectExchangeRateDetailLoading)
      .subscribe(loading => this.exchangeRateDetailLoading = loading)
  }

  ngOnDestroy(): void {
    if (this.exchangeRateSubscription) this.exchangeRateSubscription.unsubscribe();
    if (this.exchangeRateSubscriptionLoading) this.exchangeRateSubscriptionLoading.unsubscribe();
  }

  setItemInEditMode(item: EExchangeRateItem | null) {
    this.itemInEditMode = item;
  }

  updateExchangeRateItem(item?: string | number) {
    const keyIndex = Object.values(this.items)
      .findIndex(value => this.itemInEditMode === value);

    if ( this.exchangeRateDetail && keyIndex >= 0 ) {
      const key = Object.keys(this.items)[keyIndex]
      const updatedExchangeRate = { ...this.exchangeRateDetail, [key]: item }
      this.store.dispatch(updateExchangeRateDetail({ updatedExchangeRate }))

      this.itemInEditMode = null;
    }
  }

}
