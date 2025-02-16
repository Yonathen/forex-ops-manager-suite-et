import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GlobalState } from "../global.state";

export const globalState = createFeatureSelector<GlobalState>('global');

export const selectCurrentUser = createSelector( globalState, ({ currentUser }) => currentUser?.user || null);
export const selectCurrentUserError = createSelector( globalState, ({ currentUser }) => currentUser?.error || null);
export const selectCurrentUserLoading = createSelector( globalState, ({ currentUser }) => currentUser?.loading || false);

// Select exchangeRate detail
export const selectExchangeRateDetail = createSelector( globalState, ({ exchangeRateDetail }) => exchangeRateDetail?.data || null);
export const selectExchangeRateDetailError = createSelector( globalState, ({ exchangeRateDetail }) => exchangeRateDetail?.error || null);
export const selectExchangeRateDetailLoading = createSelector( globalState, ({ exchangeRateDetail }) => exchangeRateDetail?.loading || false);

// Select all exchangeRates
export const selectAllExchangeRates= createSelector( globalState, ({ allExchangeRates}) => allExchangeRates?.data || null);
export const selectAllExchangeRateError = createSelector( globalState, ({ allExchangeRates}) => allExchangeRates?.error || null);
export const selectAllExchangeRateLoading = createSelector( globalState, ({ allExchangeRates}) => allExchangeRates?.loading || false);
