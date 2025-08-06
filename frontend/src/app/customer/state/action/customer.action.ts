import { createAction, props } from "@ngrx/store";
import {BankAccount, CustomerDto, PaginatedResponseDTOCustomerDto} from "../../../../../api";
import { IEntityState } from "../../../shared/interface/entity-state";
import {ECustomerActions} from '../../enum/customer-action';
import {CustomerDetailState} from '../customer.state';

// Fetch customer by id
export const fetchCustomerById = createAction(
    ECustomerActions.FetchCustomerById,
    props<{ id: string }>()
)
export const fetchCustomerByIdCompleted = createAction(
    ECustomerActions.FetchCustomerById,
    props<{ customerDetail: CustomerDetailState }>()
)

// Create Customers
export const createCustomerDetail = createAction(
    ECustomerActions.CreateCustomer,
    props<{ createdCustomer: CustomerDto }>()
)
export const createCustomerDetailCompleted = createAction(
    ECustomerActions.CreateCustomerCompleted,
    props<{ customerDetail: CustomerDetailState }>()
)

// Remove Customers
export const removeCustomerDetail = createAction(
    ECustomerActions.RemoveCustomer,
    props<{ removedCustomer: CustomerDto }>()
)
export const removeCustomerDetailCompleted = createAction(
    ECustomerActions.RemoveCustomerCompleted,
    props<{ customerDetail: CustomerDetailState }>()
)

// Update Customers
export const updateCustomerDetail = createAction(
    ECustomerActions.UpdateCustomer,
    props<{ updatedCustomer: CustomerDto }>()
)
export const updateCustomerDetailCompleted = createAction(
    ECustomerActions.UpdateCustomerCompleted,
    props<{ customerDetail: CustomerDetailState }>()
)

// Fetch All Customers
export const fetchAllCustomers = createAction(
    ECustomerActions.FetchAllCustomers,
  props<{ page: number, size: number }>()
)
export const fetchAllCustomersCompleted = createAction(
    ECustomerActions.FetchAllCustomers,
    props<{ allCustomers: IEntityState<PaginatedResponseDTOCustomerDto> }>()
)

// Fetch all Customers
export const fetchAllCustomerAccounts = createAction(
    ECustomerActions.FetchAllCustomerAccounts,
    props<{ customerId: string }>()
)
export const fetchAllCustomerAccountsCompleted = createAction(
    ECustomerActions.FetchAllCustomerAccounts,
    props<{ allCustomerAccounts?: IEntityState<Set<BankAccount>> }>()
)

// Add account to customers
export const addAccountToCustomer = createAction(
  ECustomerActions.AddAccountToCustomer,
  props<{ customerId: string, account: BankAccount }>()
)
export const addAccountToCustomerCompleted = createAction(
  ECustomerActions.AddAccountToCustomerCompleted,
  props<{ customerDetail: CustomerDetailState }>()
)

// Remove account from customer
export const removeAccountFromCustomer = createAction(
  ECustomerActions.RemoveAccountFromCustomer,
  props<{ accountId: string, customerId: string }>()
)
export const removeAccountFromCustomerCompleted = createAction(
  ECustomerActions.RemoveAccountFromCustomerCompleted,
  props<{ customerDetail: CustomerDetailState }>()
)
