package com.yogaforex.backend.seed;

import com.yogaforex.backend.enums.EAccess;
import com.yogaforex.backend.enums.EModule;
import com.yogaforex.backend.models.Permission;
import com.yogaforex.backend.repository.PermissionRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class PermissionSeeder {

    @Autowired
    private PermissionRepository permissionRepository;

    @PostConstruct
    public void seedPermissions() {
        if (permissionRepository.count() == 0) {
            Arrays.stream(EModule.values()).toList().forEach(module -> {
                permissionRepository.save(new Permission(null, module, EAccess.READ));
                permissionRepository.save(new Permission(null, module, EAccess.WRITE));
            });
        }
    }
}