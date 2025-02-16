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
import {CustomerDto, PaginatedResponseDTOCustomerDto} from '../../../api';
import { CreateCustomerComponent } from './component/create-customer/create-customer.component';
import { fetchAllCustomers, removeCustomerDetail } from './state/action/customer.action';
import { CustomerState } from './state/customer.state';
import { selectAllCustomers, selectCustomerDetail } from './state/selector/customer.selector';

@Component({
  standalone: true,
  selector: 'app-customer',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    MenuModule,
    DialogModule,
    CreateCustomerComponent
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit, OnDestroy {

  @ViewChild('menu')
  menu!: Menu;

  selectedCustomer!: CustomerDto;


  customers: Array<CustomerDto> = [];
  paginatedResponse: PaginatedResponseDTOCustomerDto | null = null;
  totalRecords: number = 0;

  removed: boolean = false;
  private customerSubscription!: Subscription;
  private customerDetailSubscription!: Subscription;

  rowMenuItems: MenuItem[] = [];
  isCreateCustomerDialogVisible: boolean = false;

  constructor(
    private store: Store<CustomerState>,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.setMenuItems()
    this.loadCustomers();


    this.customerSubscription = this.store
      .select(selectAllCustomers)
      .subscribe((paginatedResponse) => {
        this.paginatedResponse = paginatedResponse;
        this.customers = paginatedResponse?.content || [];
        this.totalRecords = paginatedResponse?.total || 0;
      });

    this.customerDetailSubscription = this.store
      .select(selectCustomerDetail)
      .subscribe((customer: CustomerDto | null) => {
        if (this.removed && customer) {
          this.loadCustomers();
          this.removed = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.customerSubscription && this.customerSubscription.unsubscribe();
    this.customerDetailSubscription && this.customerSubscription.unsubscribe();
  }

  setMenuItems() {
    this.rowMenuItems = [
      {
        label: 'Open detail',
        icon: 'open_in_new',
        command: () => this.viewCustomerDetail()
      },
      {
        label: 'Remove customer',
        icon: 'delete',
        command: () => this.removeCustomer()
      }
    ];
  }

  loadCustomers({ first = 0, rows = 20 }: any = {}) {
    const page = first / rows;
    const size = rows;
    this.store.dispatch(fetchAllCustomers({ page, size }))
  }

  setCreateCustomerDialogVisibility(visible: boolean = true) {
    this.isCreateCustomerDialogVisible = visible;
  }

  afterCreateCallback() {
    this.loadCustomers();
  }

  toggleMenu(event: any, user: any) {
    this.selectedCustomer = user;
    this.menu.toggle(event);
  }

  viewCustomerDetail() {
    if (this.selectedCustomer) {
      this.router.navigate([ '/dashboard/customers', this.selectedCustomer.id ])
    }
  }

  removeCustomer() {
    if (!this.selectedCustomer) return

    this.removed = true;
    this.store.dispatch(removeCustomerDetail({ removedCustomer: this.selectedCustomer }))
  }
}
