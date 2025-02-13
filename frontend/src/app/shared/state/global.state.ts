import { UserPublicDto } from "../../../../api";

export interface UserPublicState {
    user?: UserPublicDto | null;
    loading: boolean;
    error?: any | null;
}

export interface GlobalState {
    currentUser?: UserPublicState
}