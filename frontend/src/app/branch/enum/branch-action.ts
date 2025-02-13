export enum EBranchActions {
    FetchBranchById = '[Branch] Fetch branch by id',
    FetchAllBranches = '[Branch] Fetch all branchs',

    CreateBranch = '[Branch] Create branch',
    CreateBranchCompleted = '[Branch] Create branch completed',

    RemoveBranch = '[Branch] Remove branch',
    RemoveBranchCompleted = '[Branch] Remove branch completed',

    UpdateBranch = '[Branch] Update branch',
    UpdateBranchCompleted = '[Branch] Update branch completed',

    FetchAllBranchUsers = '[Branch Users] Fetch all users',
    FetchAllBranchUsersCompleted = '[Branch User] Fetch all users completed',

    AddUserToBranch = '[User => Branch] Add user to a branch',
    AddUserToBranchCompleted = '[User => Branch] Add user to a branch completed',

    RemoveUserFromBranch = '[User <= Branch] Remove user from a branch',
    RemoveUserFromBranchCompleted = '[User <= Branch] Remove user from a branch completed',
}