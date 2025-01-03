package com.yogaforex.backend.service;

import com.yogaforex.backend.models.Branch;
import com.yogaforex.backend.models.Branch;
import com.yogaforex.backend.repository.BranchRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class BranchServiceImpl implements BranchService {

    private final BranchRepository branchRepository;

    public BranchServiceImpl(BranchRepository branchRepository) {
        this.branchRepository = branchRepository;
    }

    @Override
    public Optional<Branch> getById(UUID id) {
        return branchRepository.findById(id);
    }

    @Override
    public List<Branch> getAll() {
        return branchRepository.findAll();
    }

    @Override
    @Transactional
    public Branch createBranch(Branch branch) {
        return branchRepository.save(branch);
    }

    @Override
    @Transactional
    public Branch updateBranch(UUID id, Branch branch) {
        return branchRepository.findById(id).map(existingBranch -> {
            existingBranch.setName(branch.getName());
            existingBranch.setBranchCode(branch.getBranchCode());
            existingBranch.setAddress(branch.getAddress());

            return branchRepository.save(existingBranch);
        }).orElseThrow(() -> new RuntimeException("Branch not found"));
    }

    @Override
    @Transactional
    public void deleteBranch(UUID id) {
        branchRepository.deleteById(id);
    }
}
