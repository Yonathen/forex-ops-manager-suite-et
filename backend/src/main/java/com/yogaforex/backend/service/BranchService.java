package com.yogaforex.backend.service;

import com.yogaforex.backend.models.Branch;
import com.yogaforex.backend.models.Branch;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BranchService {
    Optional<Branch> getById(UUID id);
    List<Branch> getAll();
    Branch createBranch(Branch branch);
    Branch updateBranch(UUID branchId, Branch branch);
    void deleteBranch(UUID branchId);
}
