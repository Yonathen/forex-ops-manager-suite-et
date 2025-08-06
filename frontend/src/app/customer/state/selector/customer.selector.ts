import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CustomerState } from "../customer.state";

export const customerState = createFeatureSelector<CustomerState>('customer');

// Select customer detail
export const selectCustomerDetail = createSelector( customerState, ({ customerDetail }) => customerDetail?.customer || null);
export const selectCustomerDetailError = createSelector( customerState, ({ customerDetail }) => customerDetail?.error || null);
export const selectCustomerDetailLoading = createSelector( customerState, ({ customerDetail }) => customerDetail?.loading || false);

// Select all customers
export const selectAllCustomers= createSelector( customerState, ({ allCustomers}) => allCustomers?.data || null);
export const selectAllCustomerError = createSelector( customerState, ({ allCustomers}) => allCustomers?.error || null);
export const selectAllCustomerLoading = createSelector( customerState, ({ allCustomers}) => allCustomers?.loading || false);
