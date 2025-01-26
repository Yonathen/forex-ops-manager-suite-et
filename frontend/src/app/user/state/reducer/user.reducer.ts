import { createReducer, on } from "@ngrx/store";
import { updateUser, updateUserCompleted } from "../action/user.action";
import { UserState } from "../user.state";

export const initialUserState: UserState = {
    user: null
}
export const useReducer = createReducer(
    initialUserState,

    // Update user
    on(updateUser, (state) => ({ ...state, user: { loading: true }}) ),
    on(updateUserCompleted, (state, { user }) => ({ ...state, user }))
)