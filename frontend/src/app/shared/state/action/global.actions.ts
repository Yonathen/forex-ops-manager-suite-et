import { createAction, props } from "@ngrx/store";
import { UserPublicDto } from "../../../../../api";
import { EActions } from "../../enum/actions";
import { UserPublicState } from "../global.state";

export const updateCurrentUser = createAction(
    EActions.UpdateCurrentUser,
    props<{updatedUser: UserPublicDto}>()
)
export const updateCurrentUserCompleted = createAction(
    EActions.UpdateCurrentUserCompleted,
    props<{ user: UserPublicState }>()
)

// Loading current user
export const loadCurrentUser = createAction(
    EActions.LoadCurrentUser,
    props<{ id: string }>()
);
export const loadCurrentUserCompleted = createAction(
    EActions.LoadCurrentUserCompleted,
    props<{ currentUser: UserPublicState }>()
);
