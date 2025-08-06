package com.yogaforex.backend.service;

import com.yogaforex.backend.dto.BranchDto;
import com.yogaforex.backend.models.Branch;
import com.yogaforex.backend.models.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BranchService {
    Optional<Branch> getById(UUID id);
    List<Branch> getAll();
    Branch createBranch(Branch branch);
    Branch updateBranch(UUID branchId, Branch branch);
    void deleteBranch(UUID branchId);

    Branch addUserToBranch(UUID userId, UUID branchId);
    Branch removeUserFromBranch(UUID userId, UUID branchId);

    BranchDto convertBranchToBranchDto(Branch user);
    Branch convertBranchDtoToBranch(BranchDto user);
}
