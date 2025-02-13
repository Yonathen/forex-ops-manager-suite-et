import { createReducer, on } from "@ngrx/store";
import {
    addRoleToUser,
    addRoleToUserCompleted,
    fetchAllRoles,
    fetchAllRolesCompleted,
    fetchAllUsers,
    fetchAllUsersCompleted,
    fetchUserById,
    fetchUserByIdCompleted,
    fetchUserByUsername,
    fetchUserByUsernameCompleted,
    removeRoleFromUser,
    removeRoleFromUserCompleted,
    updateUserDetail,
    updateUserDetailCompleted
} from "../action/user.action";
import { UserState } from "../user.state";

export const initialUserState: UserState = {
    userDetail: null
}
export const useReducer = createReducer(
    initialUserState,

    // Fetch user by id
    on(fetchUserById, (state) => ({ ...state, currentUser: { loading: true } })),
    on(fetchUserByIdCompleted, (state, { userDetail }) => ({ ...state, userDetail })),

    // Fetch user by username
    on(fetchUserByUsername, (state) => ({ ...state, currentUser: { loading: true } })),
    on(fetchUserByUsernameCompleted, (state, { userDetail }) => ({ ...state, userDetail })),

    // Update user
    on(updateUserDetail, (state) => ({ ...state, user: { loading: true }}) ),
    on(updateUserDetailCompleted, (state, { userDetail }) => ({ ...state, userDetail })),

    // Fetch all users by page
    on(fetchAllUsers, (state) => ({ ...state, allUsers: { loading: true }}) ),
    on(fetchAllUsersCompleted, (state, { allUsers }) => ({ ...state, allUsers })),

    // Fetch all roles
    on(fetchAllRoles, (state) => ({ ...state, allRoles: { loading: true }})),
    on(fetchAllRolesCompleted, (state, { allRoles }) => ({ ...state, allRoles })),

    // Add Roles
    on(addRoleToUser, (state) => ({ ...state, user: { loading: true }}) ),
    on(addRoleToUserCompleted, (state, { userDetail }) => ({ ...state, userDetail })),

    // Remove Roles
    on(removeRoleFromUser, (state) => ({ ...state, user: { loading: true }}) ),
    on(removeRoleFromUserCompleted, (state, { userDetail }) => ({ ...state, userDetail })),
)