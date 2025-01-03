package com.yogaforex.backend.service;

import com.yogaforex.backend.dto.*;
import com.yogaforex.backend.dto.BranchDto;
import com.yogaforex.backend.models.*;
import com.yogaforex.backend.models.Branch;
import com.yogaforex.backend.repository.BranchRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.modelmapper.spi.MappingContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BranchServiceImpl implements BranchService {

    private final BranchRepository branchRepository;
    private final ModelMapper modelMapper;
    private final UserService userService;
    public static final Logger logger = LoggerFactory.getLogger(BranchServiceImpl.class);

    public BranchServiceImpl(BranchRepository branchRepository, ModelMapper modelMapper, UserService userService) {
        this.branchRepository = branchRepository;
        this.modelMapper = modelMapper;
        this.userService = userService;
        configureMappings();
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
    public Branch addUserToBranch(UUID userId, UUID branchId) {
        User user = userService.getById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        Branch branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new RuntimeException("Role not found with ID: " + branchId));

        user.setBranch(branch);
        userService.updateUser(user.getId(), user);

        return branchRepository.findById(branchId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
    }

    @Override
    public Branch removeUserFromBranch(UUID userId, UUID branchId) {
        User user = userService.getById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        Branch branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new RuntimeException("Role not found with ID: " + branchId));

        if (!user.getBranch().equals(branch)) {
            throw new RuntimeException("User is not in the branch");
        }

        user.setBranch(null);
        userService.updateUser(user.getId(), user);

        return branchRepository.findById(branchId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
    }

    @Override
    @Transactional
    public void deleteBranch(UUID id) {
        branchRepository.deleteById(id);
    }

    private void configureMappings() {
        TypeMap<Branch, BranchDto> typeMap = modelMapper.typeMap(Branch.class, BranchDto.class);
        TypeMap<BranchDto, Branch> branchDtoType = modelMapper.typeMap(BranchDto.class, Branch.class);

        typeMap.addMappings(mapper -> {
                mapper.using((MappingContext<Set<User>, Set<UserPublicDto>> ctx) -> {
                        logger.info("Branch User : source = {}", ctx.getSource());
                        return ctx.getSource() == null
                                ? null
                                : ctx.getSource()
                                .stream()
                                .map(userService::convertUserToPublicDto)
                                .collect(Collectors.toSet());
                    })
                    .map(Branch::getUsers, BranchDto::setUsers);
            });

        branchDtoType.addMappings(mapper -> {
                mapper.using((MappingContext<Set<UserPublicDto>, Set<User>> ctx) ->
                        ctx.getSource() == null
                            ? null
                            : ctx.getSource()
                                .stream()
                                .map(userService::convertPublicDtoToUser)
                                .collect(Collectors.toSet())
                        )
                        .map(BranchDto::getUsers, Branch::setUsers);
            });
    }

    @Override
    public BranchDto convertBranchToBranchDto(Branch branch) {
        logger.info("Branch to transform : name = {}, id = {}, code = {}", branch.getName(), branch.getId(), branch.getBranchCode());
        return modelMapper.map(branch, BranchDto.class);
    }

    @Override
    public Branch convertBranchDtoToBranch(BranchDto branchDto) {
        return modelMapper.map(branchDto, Branch.class);
    }
}
