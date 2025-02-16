import {ExchangeRateDto, PaginatedResponseDTOExchangeRateDto, UserPublicDto} from "../../../../api";
import {IEntityState} from '../interface/entity-state';

export interface UserPublicState {
    user?: UserPublicDto | null;
    loading: boolean;
    error?: any | null;
}

export interface GlobalState {
  currentUser?: UserPublicState,
  exchangeRateDetail?: IEntityState<ExchangeRateDto>,
  allExchangeRates?: IEntityState<PaginatedResponseDTOExchangeRateDto>,
}
