import { createReducer, on } from "@ngrx/store";
import { fetchAllUsers, fetchAllUsersCompleted } from "../../../user/state/action/user.action";
import { addUserToBranch, addUserToBranchCompleted, fetchAllBranches, fetchAllBranchesCompleted, fetchBranchById, fetchBranchByIdCompleted, removeUserFromBranch, removeUserFromBranchCompleted, updateBranchDetail, updateBranchDetailCompleted } from "../action/branch.action";
import { BranchState } from "../branch.state";

export const initialBranchState: BranchState = {
    branchDetail: null
}

export const branchReducer = createReducer(
    initialBranchState,

    // Fetch branch by id
    on(fetchBranchById, (state) => ({ ...state, currentBranch: { loading: true } })),
    on(fetchBranchByIdCompleted, (state, { branchDetail }) => ({ ...state, branchDetail })),

    // Update branch
    on(updateBranchDetail, (state) => ({ ...state, branch: { loading: true }}) ),
    on(updateBranchDetailCompleted, (state, { branchDetail }) => ({ ...state, branchDetail })),

    // Fetch all branches by page
    on(fetchAllBranches, (state) => ({ ...state, allBranches: { loading: true }}) ),
    on(fetchAllBranchesCompleted, (state, { allBranches }) => ({ ...state, allBranches })),

    // Fetch all users
    on(fetchAllUsers, (state) => ({ ...state, allUsers: { loading: true }})),
    on(fetchAllUsersCompleted, (state, { allUsers }) => ({ ...state, allUsers })),

    // Add Users to Branch
    on(addUserToBranch, (state) => ({ ...state, branch: { loading: true }}) ),
    on(addUserToBranchCompleted, (state, { branchDetail }) => ({ ...state, branchDetail })),

    // Remove Users From Branch
    on(removeUserFromBranch, (state) => ({ ...state, branch: { loading: true }}) ),
    on(removeUserFromBranchCompleted, (state, { branchDetail }) => ({ ...state, branchDetail })),
)