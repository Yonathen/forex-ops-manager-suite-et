import { createAction, props } from "@ngrx/store";
import { EActions } from "../../enum/actions";
import { UserPublicState } from "../global.state";

export const loadCurrentUser = createAction(
    EActions.LoadCurrentUser,
    props<{ id: string }>()
);

export const loadCurrentUserCompleted = createAction(
    EActions.LoadCurrentUserCompleted,
    props<{ currentUser: UserPublicState }>()
);
