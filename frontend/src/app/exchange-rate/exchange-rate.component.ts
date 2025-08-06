import { CommonModule } from '@angular/common';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Menu, MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { Subscription } from 'rxjs';
import {ExchangeRateDto, PaginatedResponseDTOExchangeRateDto} from '../../../api';
import {GlobalState} from '../shared/state/global.state';
import {selectAllExchangeRates, selectExchangeRateDetail} from '../shared/state/selector/global.selector';
import {fetchAllExchangeRates, removeExchangeRateDetail} from '../shared/state/action/global.actions';
import {CreateExchangeRateComponent} from './component/create-exchange-rate/create-exchange-rate.component';

@Component({
  standalone: true,
  selector: 'app-exchange-rate',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    MenuModule,
    DialogModule,
    CreateExchangeRateComponent
  ],
  templateUrl: './exchange-rate.component.html',
  styleUrl: './exchange-rate.component.scss'
})
export class ExchangeRateComponent implements OnInit, OnDestroy {

  @ViewChild('menu')
  menu!: Menu;

  selectedExchangeRate!: ExchangeRateDto;


  exchangeRates: Array<ExchangeRateDto> = [];
  paginatedResponse: PaginatedResponseDTOExchangeRateDto | null = null;
  totalRecords: number = 0;

  removed: boolean = false;
  private exchangeRateSubscription!: Subscription;
  private exchangeRateDetailSubscription!: Subscription;

  rowMenuItems: MenuItem[] = [];
  isCreateExchangeRateDialogVisible: boolean = false;

  constructor(
    private store: Store<GlobalState>,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.setMenuItems()
    this.loadExchangeRates();


    this.exchangeRateSubscription = this.store
      .select(selectAllExchangeRates)
      .subscribe((paginatedResponse) => {
        console.log({ paginatedResponse })
        this.paginatedResponse = paginatedResponse;
        this.exchangeRates = paginatedResponse?.content || [];
        this.totalRecords = paginatedResponse?.total || 0;
      });

    this.exchangeRateDetailSubscription = this.store
      .select(selectExchangeRateDetail)
      .subscribe((exchangeRate: ExchangeRateDto | null) => {
        if (this.removed && exchangeRate) {
          this.loadExchangeRates();
          this.removed = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.exchangeRateSubscription && this.exchangeRateSubscription.unsubscribe();
    this.exchangeRateDetailSubscription && this.exchangeRateSubscription.unsubscribe();
  }

  setMenuItems() {
    this.rowMenuItems = [
      // {
      //   label: 'Open detail',
      //   icon: 'open_in_new',
      //   command: () => this.viewExchangeRateDetail()
      // },
      {
        label: 'Remove',
        icon: 'delete',
        command: () => this.removeExchangeRate()
      }
    ];
  }

  loadExchangeRates({ first = 0, rows = 20 }: any = {}) {
    const page = first / rows;
    const size = rows;
    this.store.dispatch(fetchAllExchangeRates({ page, size }))
  }

  setCreateExchangeRateDialogVisibility(visible: boolean = true) {
    this.isCreateExchangeRateDialogVisible = visible;
  }

  afterCreateCallback() {
    this.loadExchangeRates();
  }

  toggleMenu(event: any, user: any) {
    this.selectedExchangeRate = user;
    this.menu.toggle(event);
  }

  viewExchangeRateDetail() {
    if (this.selectedExchangeRate) {
      this.router.navigate([ '/dashboard/exchange-rates', this.selectedExchangeRate.id ])
    }
  }

  removeExchangeRate() {
    if (!this.selectedExchangeRate) return

    this.removed = true;
    this.store.dispatch(removeExchangeRateDetail({ removedExchangeRate: this.selectedExchangeRate }))
  }
}
