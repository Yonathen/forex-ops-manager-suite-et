import { PaginatedResponseDTOUserPublicDto, RoleDto } from "../../../../api";
import { IEntityState } from "../../shared/interface/entity-state";
import { PaginatedResponseState } from "../../shared/interface/paginated-response-state";
import { UserPublicState } from "../../shared/state/global.state";

export interface UserState {
    userDetail?: UserPublicState | null,
    allUsers?: PaginatedResponseState<PaginatedResponseDTOUserPublicDto>,
    allRoles?: IEntityState<RoleDto[]>
}