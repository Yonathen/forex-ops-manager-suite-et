import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GlobalState } from "../global.state";

export const globalState = createFeatureSelector<GlobalState>('global');

export const selectCurrentUser = createSelector( globalState, ({ currentUser }) => currentUser?.user || null);
export const selectCurrentUserError = createSelector( globalState, ({ currentUser }) => currentUser?.error || null);
export const selectCurrentUserLoading = createSelector( globalState, ({ currentUser }) => currentUser?.loading || false);