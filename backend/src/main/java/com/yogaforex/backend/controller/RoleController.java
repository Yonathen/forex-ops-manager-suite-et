package com.yogaforex.backend.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yogaforex.backend.dto.RoleDto;
import com.yogaforex.backend.models.Role;
import com.yogaforex.backend.service.RoleService;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    private final RoleService roleService;
    public static final Logger logger = LoggerFactory.getLogger(RoleController.class);

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping
    public ResponseEntity<List<RoleDto>> fetchAllRolees() {
        List<Role> rolees = roleService.getAll();
        List<RoleDto> roleesDto = rolees
                .stream()
                .map(roleService::convertRoleToRoleDto)
                .toList();
        return ResponseEntity.ok(roleesDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoleDto> fetchRoleById(@PathVariable UUID id) {
        Optional<Role> role = roleService.getById(id);
        if (role.isEmpty()) {
            logger.info("Role with id {} not found", id);
            return ResponseEntity.notFound().build();
        }

        logger.info("Fetched role by id before transform to public DTO : {}", role.get());
        return ResponseEntity.ok(roleService.convertRoleToRoleDto(role.get()));
    }

    @PostMapping
    public ResponseEntity<RoleDto> createRole(@RequestBody RoleDto roleDto) {
        Role role = roleService.convertRoleDtoToRole(roleDto);
        Role createdRole = roleService.createRole(role);
        return ResponseEntity.ok(roleService.convertRoleToRoleDto(createdRole));
    }

    @PutMapping
    public ResponseEntity<RoleDto> updateRole(@RequestBody RoleDto roleDto) {
        Optional<Role> role = roleService.getById(roleDto.getId());
        if (role.isEmpty()) {
            logger.info("Role id {} for update not found", roleDto.getId());
            return ResponseEntity.notFound().build();
        }

        logger.info("Updated role id before transform to public DTO : {}", roleDto.getId());
        Role roleForUpdate = roleService.convertRoleDtoToRole(roleDto);
        logger.info("Transformed role for update : {}", roleForUpdate.toString());

        Role updatedRole = roleService.updateRole(roleDto.getId(), roleForUpdate);
        logger.info("Updated role id after transform to public DTO : {}", updatedRole.getId());

        return ResponseEntity.ok(roleService.convertRoleToRoleDto(updatedRole));
    }

    @DeleteMapping
    public ResponseEntity<RoleDto> deleteRole(@RequestBody RoleDto roleDto) {
        Optional<Role> role = roleService.getById(roleDto.getId());
        if (role.isEmpty()) {
            logger.info("Role id {} for delete is not found", roleDto.getId());
            return ResponseEntity.notFound().build();
        }

        roleService.deleteRole(roleDto.getId());
        logger.info("Deleted role id : {}", roleDto.getId());

        return ResponseEntity.ok(roleService.convertRoleToRoleDto(role.get()));
    }

}

