import { createAction, props } from "@ngrx/store";
import { BranchDto, UserPublicDto } from "../../../../../api";
import { IEntityState } from "../../../shared/interface/entity-state";
import { EBranchActions } from "../../enum/branch-action";
import { BranchDetailState } from "../branch.state";

// Fetch branch by id
export const fetchBranchById = createAction(
    EBranchActions.FetchBranchById,
    props<{ id: string }>()
)
export const fetchBranchByIdCompleted = createAction(
    EBranchActions.FetchBranchById,
    props<{ branchDetail: BranchDetailState }>()
)

// Update Branches
export const updateBranchDetail = createAction(
    EBranchActions.UpdateBranch,
    props<{ updatedBranch: BranchDto }>()
)
export const updateBranchDetailCompleted = createAction(
    EBranchActions.UpdateBranchCompleted,
    props<{ branchDetail: BranchDetailState }>()
)

// Fetch All branches
export const fetchAllBranches = createAction(
    EBranchActions.FetchAllBranches
)
export const fetchAllBranchesCompleted = createAction(
    EBranchActions.FetchAllBranches,
    props<{ allBranches: IEntityState<BranchDto[]> }>()
)

// Fetch all branches
export const fetchAllBranchUsers = createAction(
    EBranchActions.FetchAllBranchUsers,
    props<{ branchId: string }>()
)
export const fetchAllBranchUsersCompleted = createAction(
    EBranchActions.FetchAllBranchUsers,
    props<{ allBranchUsers?: IEntityState<Set<UserPublicDto>> }>()
)

// Add user to branches
export const addUserToBranch = createAction(
    EBranchActions.AddUserToBranch,
    props<{ userId: string, branchId: string }>()
)
export const addUserToBranchCompleted = createAction(
    EBranchActions.AddUserToBranchCompleted,
    props<{ branchDetail: BranchDetailState }>()
)

// Remove user from branch
export const removeUserFromBranch = createAction(
    EBranchActions.RemoveUserFromBranch,
    props<{ userId: string, branchId: string }>()
)
export const removeUserFromBranchCompleted = createAction(
    EBranchActions.RemoveUserFromBranchCompleted,
    props<{ branchDetail: BranchDetailState }>()
)