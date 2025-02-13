package com.yogaforex.backend.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.yogaforex.backend.dto.RoleDto;
import com.yogaforex.backend.models.Role;

public interface RoleService {
    Optional<Role> getById(UUID id);
    List<Role> getAll();
    Role createRole(Role branch);
    Role updateRole(UUID branchId, Role branch);
    void deleteRole(UUID branchId);

    RoleDto convertRoleToRoleDto(Role user);
    Role convertRoleDtoToRole(RoleDto user);
}
