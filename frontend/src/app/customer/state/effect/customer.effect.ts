import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { CustomerDto } from '../../../../../api';
import { CustomerService } from '../../service/customer.service';
import {
  createCustomerDetail,
  createCustomerDetailCompleted,
  fetchAllCustomers,
  fetchAllCustomersCompleted,
  fetchCustomerById,
  fetchCustomerByIdCompleted,
  removeCustomerDetail,
  removeCustomerDetailCompleted,
  updateCustomerDetail,
  updateCustomerDetailCompleted
} from '../action/customer.action';

import {
  addAccountToCustomer,
  addAccountToCustomerCompleted,
  removeAccountFromCustomer, removeAccountFromCustomerCompleted
} from '../../../customer/state/action/customer.action';

@Injectable()
export class CustomerEffect {
  private actions$ = inject(Actions);

  constructor(
    private customerService: CustomerService
  ) { }

  createCustomerDetail$ = createEffect(() => {
    return this.actions$?.pipe(
      ofType(createCustomerDetail),
      exhaustMap((action) => {
        console.log({ action })
        return this.customerService.createCustomer(action.createdCustomer as CustomerDto).pipe(
          map((customer) => createCustomerDetailCompleted({ customerDetail: { customer: customer, loading: false } })),
          catchError((error) => of(createCustomerDetailCompleted({ customerDetail: { loading: false, error }})))
        )
      })
    )
  })

  removeCustomerDetail$ = createEffect(() => {
    return this.actions$?.pipe(
      ofType(removeCustomerDetail),
      exhaustMap((action) => {
        return this.customerService.removeCustomer(action.removedCustomer as CustomerDto).pipe(
          map((customer) => removeCustomerDetailCompleted({ customerDetail: { customer: customer, loading: false } })),
          catchError((error) => of(removeCustomerDetailCompleted({ customerDetail: { loading: false, error }})))
        )
      })
    )
  })

  updateCustomerDetail$ = createEffect(() => {
    return this.actions$?.pipe(
      ofType(updateCustomerDetail),
      exhaustMap((action) => {
        return this.customerService.updateCustomer(action.updatedCustomer as CustomerDto).pipe(
          map((customer) => updateCustomerDetailCompleted({ customerDetail: { customer: customer, loading: false } })),
          catchError((error) => of(updateCustomerDetailCompleted({ customerDetail: { loading: false, error }})))
        )
      })
    )
  })

  fetchCustomerById$ = createEffect(() => {
    return this.actions$?.pipe(
      ofType(fetchCustomerById),
      exhaustMap((action) => {
        return this.customerService.getCustomer(action.id).pipe(
          map((customer) => fetchCustomerByIdCompleted({ customerDetail: { customer: customer, loading: false } })),
          catchError((error) => of(fetchCustomerByIdCompleted({ customerDetail: { loading: false, error }})))
        )
      })
    )
  })

  fetchAllCustomers$ = createEffect(() => {
    return this.actions$?.pipe(
      ofType(fetchAllCustomers),
      exhaustMap((action) => {
        return this.customerService.fetchAllCustomers(action.page, action.size).pipe(
          map((data) => fetchAllCustomersCompleted({ allCustomers: { loading: false, data } })),
          catchError((error) => of(fetchAllCustomersCompleted({ allCustomers: { loading: false, error }})))
        )
      })
    )
  })

  addAccountToCustomer$ = createEffect(() => {
    return this.actions$?.pipe(
      ofType(addAccountToCustomer),
      exhaustMap((action) => {
        return this.customerService.addAccountToCustomer(action.customerId, action.account).pipe(
          map((customer) => addAccountToCustomerCompleted({ customerDetail: { customer, loading: false } })),
          catchError((error) => of(addAccountToCustomerCompleted({ customerDetail: { loading: false, error }})))
        )
      })
    )
  })

  removeAccountFromCustomer$ = createEffect(() => {
    return this.actions$?.pipe(
      ofType(removeAccountFromCustomer),
      exhaustMap((action) => {
        return this.customerService.removeAccountFromCustomer(action.accountId, action.customerId).pipe(
          map((customer) => removeAccountFromCustomerCompleted({ customerDetail: { customer, loading: false } })),
          catchError((error) => of(removeAccountFromCustomerCompleted({ customerDetail: { loading: false, error }})))
        )
      })
    )
  })

}
