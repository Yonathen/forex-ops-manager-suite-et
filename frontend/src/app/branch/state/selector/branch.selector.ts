import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BranchState } from "../branch.state";

export const branchState = createFeatureSelector<BranchState>('branch');

// Select branch detail
export const selectBranchDetail = createSelector( branchState, ({ branchDetail }) => branchDetail?.branch || null);
export const selectBranchDetailError = createSelector( branchState, ({ branchDetail }) => branchDetail?.error || null);
export const selectBranchDetailLoading = createSelector( branchState, ({ branchDetail }) => branchDetail?.loading || false);

// Select all branchs
export const selectAllBranches= createSelector( branchState, ({ allBranches}) => allBranches?.data || null);
export const selectAllBranchError = createSelector( branchState, ({ allBranches}) => allBranches?.error || null);
export const selectAllBranchLoading = createSelector( branchState, ({ allBranches}) => allBranches?.loading || false);

// Select all roles
export const selectAllBranchUsers = createSelector( branchState, ({ allBranchUsers }) => allBranchUsers?.data || null);
export const selectAllRoleError = createSelector( branchState, ({ allBranchUsers }) => allBranchUsers?.error || null);
export const selectAllRoleLoading = createSelector( branchState, ({ allBranchUsers }) => allBranchUsers?.loading || false);