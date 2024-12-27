package com.yogaforex.backend.repository;

import com.yogaforex.backend.enums.ERole;
import com.yogaforex.backend.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface RoleRepository extends JpaRepository<Role, UUID> {
    Optional<Role> findByName(ERole name);
}
