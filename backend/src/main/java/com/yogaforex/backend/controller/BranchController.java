package com.yogaforex.backend.controller;

import com.yogaforex.backend.dto.BranchDto;
import com.yogaforex.backend.dto.UserPublicDto;
import com.yogaforex.backend.models.Branch;
import com.yogaforex.backend.models.User;
import com.yogaforex.backend.service.BranchService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/branches")
public class BranchController {

    private final BranchService branchService;
    public static final Logger logger = LoggerFactory.getLogger(BranchController.class);

    public BranchController(BranchService branchService) {
        this.branchService = branchService;
    }

    @GetMapping
    public ResponseEntity<List<BranchDto>> fetchAllBranches() {
        List<Branch> branches = branchService.getAll();
        List<BranchDto> branchesDto = branches
                .stream()
                .map(branchService::convertBranchToBranchDto)
                .toList();
        return ResponseEntity.ok(branchesDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BranchDto> fetchBranchById(@PathVariable UUID id) {
        Optional<Branch> branch = branchService.getById(id);
        if (branch.isEmpty()) {
            logger.info("Branch with id {} not found", id);
            return ResponseEntity.notFound().build();
        }

        logger.info("Fetched user by id before transform to public DTO : {}", branch.get());
        return ResponseEntity.ok(branchService.convertBranchToBranchDto(branch.get()));
    }

    @PutMapping("/add-user/{userId}/{branchId}")
    public ResponseEntity<BranchDto> addRoleToUser(@PathVariable UUID userId, @PathVariable UUID branchId) {
        logger.info("Add user with user id of {} to branch with branch id of {}", userId, branchId);
        Branch updatedBranch = branchService.addUserToBranch(userId, branchId);
        return ResponseEntity.ok(branchService.convertBranchToBranchDto(updatedBranch));
    }

    @PutMapping("/remove-user/{userId}/{branchId}")
    public ResponseEntity<BranchDto> removeRoleFromUser(@PathVariable UUID userId, @PathVariable UUID branchId) {
        logger.info("Remove role with role id of {} from user with user id of {}", userId, branchId);
        Branch updatedBranch = branchService.removeUserFromBranch(userId, branchId);
        return ResponseEntity.ok(branchService.convertBranchToBranchDto(updatedBranch));
    }

    @GetMapping("/users/{branchId}")
    public ResponseEntity<Set<UserPublicDto>> fetchAllUsersByBranchId(@PathVariable UUID branchId) {
        Optional<Branch> branch = branchService.getById(branchId);
        if (branch.isEmpty()) {
            logger.info("Branch with an id of {} for getting users not found", branchId);
            return ResponseEntity.notFound().build();
        }

        logger.info("fetchAllUsersByBranchId: Fetched user by id before transform to public DTO : {}", branch.get());
        BranchDto branchDto = branchService.convertBranchToBranchDto(branch.get());
        return ResponseEntity.ok(branchDto.getUsers());
    }

    @PostMapping
    public ResponseEntity<BranchDto> createBranch(@RequestBody BranchDto branchDto) {
        Branch branch = branchService.convertBranchDtoToBranch(branchDto);
        Branch createdBranch = branchService.createBranch(branch);
        return ResponseEntity.ok(branchService.convertBranchToBranchDto(createdBranch));
    }

    @PutMapping
    public ResponseEntity<BranchDto> updateBranch(@RequestBody BranchDto userDto) {
        Optional<Branch> user = branchService.getById(userDto.getId());
        if (user.isEmpty()) {
            logger.info("Branch id {} for update not found", userDto.getId());
            return ResponseEntity.notFound().build();
        }

        logger.info("Updated user id before transform to public DTO : {}", userDto.getId());
        Branch userForUpdate = branchService.convertBranchDtoToBranch(userDto);
        logger.info("Transformed user for update : {}", userForUpdate.toString());

        Branch updatedBranch = branchService.updateBranch(userDto.getId(), userForUpdate);
        logger.info("Updated user id after transform to public DTO : {}", updatedBranch.getId());

        return ResponseEntity.ok(branchService.convertBranchToBranchDto(updatedBranch));
    }

    @DeleteMapping
    public ResponseEntity<BranchDto> deleteBranch(@RequestBody BranchDto userDto) {
        Optional<Branch> user = branchService.getById(userDto.getId());
        if (user.isEmpty()) {
            logger.info("Branch id {} for delete is not found", userDto.getId());
            return ResponseEntity.notFound().build();
        }

        branchService.deleteBranch(userDto.getId());
        logger.info("Deleted user id : {}", userDto.getId());

        return ResponseEntity.ok(branchService.convertBranchToBranchDto(user.get()));
    }

}

