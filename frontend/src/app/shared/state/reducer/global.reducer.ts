import { createReducer, on } from "@ngrx/store";
import {
  createExchangeRateDetail,
  createExchangeRateDetailCompleted,
  fetchAllCurrencies,
  fetchAllCurrenciesCompleted,
  fetchAllExchangeRates,
  fetchAllExchangeRatesCompleted,
  fetchExchangeRateById,
  fetchExchangeRateByIdCompleted,
  loadCurrentUser,
  loadCurrentUserCompleted,
  removeExchangeRateDetail,
  removeExchangeRateDetailCompleted,
  updateCurrentUser,
  updateCurrentUserCompleted,
  updateExchangeRateDetail,
  updateExchangeRateDetailCompleted
} from "../action/global.actions";
import { GlobalState } from "../global.state";

export const initialState: GlobalState = {};

export const globalReducer = createReducer(
    initialState,
    on(loadCurrentUser, (state) => ({ ...state, currentUser: { loading: true } })),
    on(loadCurrentUserCompleted, (state, { currentUser }) => ({ ...state, currentUser })),

    // Update user
    on(updateCurrentUser, (state) => ({ ...state, user: { loading: true }}) ),
    on(updateCurrentUserCompleted, (state, { user }) => ({ ...state, user })),

    // Fetch exchangeRate by id
    on(fetchExchangeRateById, (state) => ({ ...state, exchangeRateDetail: { loading: true } })),
    on(fetchExchangeRateByIdCompleted, (state, { exchangeRateDetail }) => ({ ...state, exchangeRateDetail })),

    // Create exchangeRate
    on(createExchangeRateDetail, (state) => ({ ...state, exchangeRateDetail: { loading: true }}) ),
    on(createExchangeRateDetailCompleted, (state, { exchangeRateDetail }) => ({ ...state, exchangeRateDetail })),

    // Remove exchangeRate
    on(removeExchangeRateDetail, (state) => ({ ...state, exchangeRateDetail: { loading: true }}) ),
    on(removeExchangeRateDetailCompleted, (state, { exchangeRateDetail }) => ({ ...state, exchangeRateDetail })),

    // Update exchangeRate
    on(updateExchangeRateDetail, (state) => ({ ...state, exchangeRateDetail: { loading: true }}) ),
    on(updateExchangeRateDetailCompleted, (state, { exchangeRateDetail }) => ({ ...state, exchangeRateDetail })),

    // Fetch all exchangeRates by page
    on(fetchAllExchangeRates, (state) => ({ ...state, allExchangeRates: { loading: true }}) ),
    on(fetchAllExchangeRatesCompleted, (state, { allExchangeRates }) => ({ ...state, allExchangeRates })),

    // Fetch all currencies by page
    on(fetchAllCurrencies, (state) => ({ ...state, allCurrencies: { loading: true }}) ),
    on(fetchAllCurrenciesCompleted, (state, { allCurrencies }) => ({ ...state, allCurrencies })),
)
