
export enum EUserActions {
    FetchUserById = '[User] Fetch user by id',
    FetchUserByIdCompleted = '[User] Fetch user by id completed',

    FetchUserByUsername = '[User] Fetch user by email',
    FetchUserByUsernameCompleted = '[User] Fetch user by email completed',

    FetchAllUsers = '[User] Fetch all users',
    FetchAllUsersCompleted = '[User] Fetch all users completed',

    UpdateUser = '[User] Update user',
    UpdateUserCompleted = '[User] Update user completed',

    FetchAllRoles = '[Role] Fetch all roles',
    FetchAllRolesCompleted = '[Role] Fetch all roles completed',

    AddRoleToUser = '[Role => User] Add role to a user',
    AddRoleToUserCompleted = '[Role => User] Add role to a user completed',

    RemoveRoleFromUser = '[Role <= User] Remove role from a user',
    RemoveRoleFromUserCompleted = '[Role <= User] Remove role from a user completed',
}