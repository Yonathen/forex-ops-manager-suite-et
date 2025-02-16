import { PaginatedResponseDTOUserPublicDto, RoleDto } from "../../../../api";
import { IEntityState } from "../../shared/interface/entity-state";
import { ResponseState } from "../../shared/interface/response-state";
import { UserPublicState } from "../../shared/state/global.state";

export interface UserState {
    userDetail?: UserPublicState | null,
    allUsers?: ResponseState<PaginatedResponseDTOUserPublicDto>,
    allRoles?: IEntityState<RoleDto[]>
}
