import { createAction, props } from "@ngrx/store";
import { UserPublicDto } from "../../../../../api";
import { UserPublicState } from "../../../shared/state/global.state";
import { EUserActions } from "../../enum/user-actions";

export const updateUser = createAction(
    EUserActions.UpdateUser,
    props<{updatedUser: UserPublicDto}>()
)

export const updateUserCompleted = createAction(
    EUserActions.UpdateUserCompleted,
    props<{ user: UserPublicState }>()
)