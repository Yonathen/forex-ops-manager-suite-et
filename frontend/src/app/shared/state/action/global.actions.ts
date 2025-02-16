import { createAction, props } from "@ngrx/store";
import {ExchangeRateDto, ExchangeRate, PaginatedResponseDTOExchangeRateDto, UserPublicDto} from "../../../../../api";
import { EActions } from "../../enum/actions";
import { UserPublicState } from "../global.state";
import {IEntityState} from '../../interface/entity-state';

export const updateCurrentUser = createAction(
    EActions.UpdateCurrentUser,
    props<{updatedUser: UserPublicDto}>()
)
export const updateCurrentUserCompleted = createAction(
    EActions.UpdateCurrentUserCompleted,
    props<{ user: UserPublicState }>()
)

// Loading current user
export const loadCurrentUser = createAction(
    EActions.LoadCurrentUser,
    props<{ id: string }>()
);
export const loadCurrentUserCompleted = createAction(
    EActions.LoadCurrentUserCompleted,
    props<{ currentUser: UserPublicState }>()
);

// Fetch All ExchangeRates
export const fetchAllExchangeRates = createAction(
  EActions.FetchAllExchangeRates,
  props<{ page: number, size: number }>()
)
export const fetchAllExchangeRatesCompleted = createAction(
  EActions.FetchAllExchangeRatesCompleted,
  props<{ allExchangeRates: IEntityState<PaginatedResponseDTOExchangeRateDto> }>()
)

// Fetch exchangeRate by id
export const fetchExchangeRateById = createAction(
  EActions.FetchExchangeRateById,
  props<{ id: string }>()
)
export const fetchExchangeRateByIdCompleted = createAction(
  EActions.FetchExchangeRateById,
  props<{ exchangeRateDetail: IEntityState<ExchangeRate> }>()
)

// Create ExchangeRates
export const createExchangeRateDetail = createAction(
  EActions.CreateExchangeRate,
  props<{ createdExchangeRate: ExchangeRateDto }>()
)
export const createExchangeRateDetailCompleted = createAction(
  EActions.CreateExchangeRateCompleted,
  props<{ exchangeRateDetail: IEntityState<ExchangeRate> }>()
)

// Remove ExchangeRates
export const removeExchangeRateDetail = createAction(
  EActions.RemoveExchangeRate,
  props<{ removedExchangeRate: ExchangeRateDto }>()
)
export const removeExchangeRateDetailCompleted = createAction(
  EActions.RemoveExchangeRateCompleted,
  props<{ exchangeRateDetail: IEntityState<ExchangeRate> }>()
)

// Update ExchangeRates
export const updateExchangeRateDetail = createAction(
  EActions.UpdateExchangeRate,
  props<{ updatedExchangeRate: ExchangeRateDto }>()
)
export const updateExchangeRateDetailCompleted = createAction(
  EActions.UpdateExchangeRateCompleted,
  props<{ exchangeRateDetail: IEntityState<ExchangeRate> }>()
)
