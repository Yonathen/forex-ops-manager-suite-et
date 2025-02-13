import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "../user.state";

export const userState = createFeatureSelector<UserState>('user');

// Select user detail
export const selectUserDetail = createSelector( userState, ({ userDetail }) => userDetail?.user || null);
export const selectUserDetailError = createSelector( userState, ({ userDetail }) => userDetail?.error || null);
export const selectUserDetailLoading = createSelector( userState, ({ userDetail }) => userDetail?.loading || false);

// Select all users
export const selectAllUsers = createSelector( userState, ({ allUsers }) => allUsers?.data || null);
export const selectAllUserError = createSelector( userState, ({ allUsers }) => allUsers?.error || null);
export const selectAllUserLoading = createSelector( userState, ({ allUsers }) => allUsers?.loading || false);

// Select all roles
export const selectAllRoles = createSelector( userState, ({ allRoles }) => allRoles?.data || null);
export const selectAllRoleError = createSelector( userState, ({ allRoles }) => allRoles?.error || null);
export const selectAllRoleLoading = createSelector( userState, ({ allRoles }) => allRoles?.loading || false);