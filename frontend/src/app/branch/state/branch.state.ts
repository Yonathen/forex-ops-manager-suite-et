import { BranchDto, UserPublicDto } from "../../../../api";
import { IEntityState } from "../../shared/interface/entity-state";

export interface BranchDetailState {
    branch?: BranchDto | null;
    loading: boolean;
    error?: any | null;
}

export interface BranchState {
    branchDetail?: BranchDetailState | null,
    allBranches?: IEntityState<BranchDto[]>
    allBranchUsers?: IEntityState<Set<UserPublicDto>>
}