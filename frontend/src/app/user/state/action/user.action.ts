import { createAction, props } from "@ngrx/store";
import { PaginatedResponseDTOUserPublicDto, RoleDto, UserPublicDto } from "../../../../../api";
import { IEntityState } from "../../../shared/interface/entity-state";
import { PaginatedResponseState } from "../../../shared/interface/paginated-response-state";
import { UserPublicState } from "../../../shared/state/global.state";
import { EUserActions } from "../../enum/user-actions";

// Fetch user by id
export const fetchUserById = createAction(
    EUserActions.FetchUserById,
    props<{ id: string }>()
)
export const fetchUserByIdCompleted = createAction(
    EUserActions.FetchUserByIdCompleted,
    props<{ userDetail: UserPublicState }>()
)

// Fetch user by username
export const fetchUserByUsername = createAction(
    EUserActions.FetchUserByUsername,
    props<{ username: string }>()
)
export const fetchUserByUsernameCompleted = createAction(
    EUserActions.FetchUserByUsernameCompleted,
    props<{ userDetail: UserPublicState }>()
)

// Update Users
export const updateUserDetail = createAction(
    EUserActions.UpdateUser,
    props<{ updatedUser: UserPublicDto }>()
)
export const updateUserDetailCompleted = createAction(
    EUserActions.UpdateUserCompleted,
    props<{ userDetail: UserPublicState }>()
)

// Fetch All users
export const fetchAllUsers = createAction(
    EUserActions.FetchAllUsers,
    props<{ page: number, size: number }>()
)
export const fetchAllUsersCompleted = createAction(
    EUserActions.FetchAllUsersCompleted,
    props<{ allUsers: PaginatedResponseState<PaginatedResponseDTOUserPublicDto> }>()
)

// Fetch all roles
export const fetchAllRoles = createAction(
    EUserActions.FetchAllRoles
)
export const fetchAllRolesCompleted = createAction(
    EUserActions.FetchAllRolesCompleted,
    props<{ allRoles: IEntityState<Array<RoleDto>> }>()
)

// Add roles
export const addRoleToUser = createAction(
    EUserActions.AddRoleToUser,
    props<{ userId: string, roleId: string }>()
)
export const addRoleToUserCompleted = createAction(
    EUserActions.AddRoleToUserCompleted,
    props<{ userDetail: UserPublicState }>()
)

// Remove roles
export const removeRoleFromUser = createAction(
    EUserActions.RemoveRoleFromUser,
    props<{ userId: string, roleId: string }>()
)
export const removeRoleFromUserCompleted = createAction(
    EUserActions.RemoveRoleFromUserCompleted,
    props<{ userDetail: UserPublicState }>()
)