package com.yogaforex.backend.seed;

import com.yogaforex.backend.enums.EAccess;
import com.yogaforex.backend.enums.EModule;
import com.yogaforex.backend.enums.ERole;
import com.yogaforex.backend.models.Permission;
import com.yogaforex.backend.models.Role;
import com.yogaforex.backend.repository.PermissionRepository;
import com.yogaforex.backend.repository.RoleRepository;
import com.yogaforex.backend.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class RoleSeeder {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private UserRepository userRepository;

    @PostConstruct
    public void seedRoles() {
        userRepository.deleteAll();
        roleRepository.deleteAll();

        Set<Permission> userPermissions = new HashSet<>();
        userPermissions.add(
                permissionRepository.findByModuleAndAccess(EModule.USER_MANAGEMENT, EAccess.READ).orElseThrow()
        );
        roleRepository.save(new Role(null, ERole.ROLE_ADMIN, new HashSet<>(permissionRepository.findAll())));
        roleRepository.save(new Role(null, ERole.ROLE_USER, userPermissions));
    }
}