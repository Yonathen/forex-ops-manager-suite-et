
export enum EUserActions {
    FetchUserById = '[User] Fetch user by id',
    FetchAllUsers = '[User] Fetch all users',

    UpdateUser = '[User] Update user',
    UpdateUserCompleted = '[User] Update user completed',

    FetchAllRoles = '[Role] Fetch all roles',
    FetchAllRolesCompleted = '[Role] Fetch all roles completed',

    AddRoleToUser = '[Role] Add role to a user',
    AddRoleToUserCompleted = '[Role] Add role to a user completed',

    RemoveRoleFromUser = '[Role] Remove role from a user',
    RemoveRoleFromUserCompleted = '[Role] Remove role from a user completed',
}