import { createReducer, on } from "@ngrx/store";
import { fetchAllUsers, fetchAllUsersCompleted } from "../../../user/state/action/user.action";
import {
  addAccountToCustomer, addAccountToCustomerCompleted,
  createCustomerDetail,
  createCustomerDetailCompleted, fetchAllCustomerAccounts, fetchAllCustomerAccountsCompleted,
  fetchAllCustomers,
  fetchAllCustomersCompleted,
  fetchCustomerById,
  fetchCustomerByIdCompleted, removeAccountFromCustomer, removeAccountFromCustomerCompleted,
  removeCustomerDetail,
  removeCustomerDetailCompleted,
  updateCustomerDetail,
  updateCustomerDetailCompleted
} from "../action/customer.action";
import { CustomerState } from "../customer.state";

export const initialCustomerState: CustomerState = {
    customerDetail: null
}

export const customersReducer = createReducer(
  initialCustomerState,

  // Fetch customer by id
  on(fetchCustomerById, (state) => ({ ...state, currentCustomer: { loading: true } })),
  on(fetchCustomerByIdCompleted, (state, { customerDetail }) => ({ ...state, customerDetail })),

  // Create customer
  on(createCustomerDetail, (state) => ({ ...state, customer: { loading: true }}) ),
  on(createCustomerDetailCompleted, (state, { customerDetail }) => ({ ...state, customerDetail })),

  // Remove customer
  on(removeCustomerDetail, (state) => ({ ...state, customer: { loading: true }}) ),
  on(removeCustomerDetailCompleted, (state, { customerDetail }) => ({ ...state, customerDetail })),

  // Update customer
  on(updateCustomerDetail, (state) => ({ ...state, customer: { loading: true }}) ),
  on(updateCustomerDetailCompleted, (state, { customerDetail }) => ({ ...state, customerDetail })),

  // Fetch all customeres by page
  on(fetchAllCustomers, (state) => ({ ...state, allCustomers: { loading: true }}) ),
  on(fetchAllCustomersCompleted, (state, { allCustomers }) => ({ ...state, allCustomers })),

  // // Fetch all users
  // on(fetchAllCustomerAccounts, (state) => ({ ...state, allCustomerAccounts: { loading: true }})),
  // on(fetchAllCustomerAccountsCompleted, (state, { allCustomerAccounts }) => ({ ...state, allCustomerAccounts })),

  // Add Users to Branch
  on(addAccountToCustomer, (state) => ({ ...state, branch: { loading: true }}) ),
  on(addAccountToCustomerCompleted, (state, { customerDetail }) => ({ ...state, customerDetail })),

  // Remove Users From Branch
  on(removeAccountFromCustomer, (state) => ({ ...state, branch: { loading: true }}) ),
  on(removeAccountFromCustomerCompleted, (state, { customerDetail }) => ({ ...state, customerDetail })),
)
