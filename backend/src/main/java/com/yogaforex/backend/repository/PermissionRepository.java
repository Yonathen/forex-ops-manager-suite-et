package com.yogaforex.backend.repository;

import com.yogaforex.backend.enums.EAccess;
import com.yogaforex.backend.enums.EModule;
import com.yogaforex.backend.enums.ERole;
import com.yogaforex.backend.models.Permission;
import com.yogaforex.backend.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface PermissionRepository extends JpaRepository<Permission, UUID> {
    Optional<Set<Permission>> findAllByModule(EModule module);
    Optional<Permission> findByModuleAndAccess(EModule module, EAccess access);
}
