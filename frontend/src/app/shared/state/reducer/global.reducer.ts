import { createReducer, on } from "@ngrx/store";
import { loadCurrentUser, loadCurrentUserCompleted } from "../action/global.actions";
import { GlobalState } from "../global.state";

export const initialState: GlobalState = {};

export const globalReducer = createReducer(
    initialState,
    on(loadCurrentUser, (state) => ({ ...state, currentUser: { loading: true } })),
    on(loadCurrentUserCompleted, (state, { currentUser }) => ({ ...state, currentUser }))
)