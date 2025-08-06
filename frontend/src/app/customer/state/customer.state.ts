import {CustomerDto, PaginatedResponseDTOCustomerDto, UserPublicDto} from "../../../../api";
import { IEntityState } from "../../shared/interface/entity-state";

export interface CustomerDetailState {
    customer?: CustomerDto | null;
    loading: boolean;
    error?: any | null;
}

export interface CustomerState {
    customerDetail?: CustomerDetailState | null,
    allCustomers?: IEntityState<PaginatedResponseDTOCustomerDto>,
    allCustomerAccounts?: Array<CustomerDto | null>
}
