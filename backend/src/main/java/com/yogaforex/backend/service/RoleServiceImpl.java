package com.yogaforex.backend.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.modelmapper.spi.MappingContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yogaforex.backend.dto.PermissionDto;
import com.yogaforex.backend.dto.RoleDto;
import com.yogaforex.backend.models.Permission;
import com.yogaforex.backend.models.Role;
import com.yogaforex.backend.repository.RoleRepository;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;
    private final ModelMapper modelMapper;
    public static final Logger logger = LoggerFactory.getLogger(RoleServiceImpl.class);

    public RoleServiceImpl(RoleRepository roleRepository, ModelMapper modelMapper) {
        this.roleRepository = roleRepository;
        this.modelMapper = modelMapper;

        configureMappings();
    }

    @Override
    public Optional<Role> getById(UUID id) {
        return roleRepository.findById(id);
    }

    @Override
    public List<Role> getAll() {
        return roleRepository.findAll();
    }

    @Override
    @Transactional
    public Role createRole(Role role) {
        return roleRepository.save(role);
    }

    @Override
    @Transactional
    public Role updateRole(UUID id, Role role) {
        return roleRepository.findById(id).map(existingRole -> {
            existingRole.setName(role.getName());
            existingRole.setPermissions(role.getPermissions());

            return roleRepository.save(existingRole);
        }).orElseThrow(() -> new RuntimeException("Role not found"));
    }

    @Override
    @Transactional
    public void deleteRole(UUID id) {
        roleRepository.deleteById(id);
    }

    private void configureMappings() {
        TypeMap<Role, RoleDto> typeMap = modelMapper.typeMap(Role.class, RoleDto.class);
        TypeMap<RoleDto, Role> roleDtoType = modelMapper.typeMap(RoleDto.class, Role.class);

        typeMap.addMappings(mapper -> {
                mapper.using((MappingContext<Set<Permission>, Set<PermissionDto>> ctx) -> {
                        logger.info("Role User : source = {}", ctx.getSource());
                        return ctx.getSource() == null
                                ? null
                                : ctx.getSource()
                                    .stream()
                                    .map(permission -> new PermissionDto(
                                        permission.getId(),
                                        permission.getModule(),
                                        permission.getAccess()
                                    ))
                                    .collect(Collectors.toSet());
                    })
                    .map(Role::getPermissions, RoleDto::setPermissions);
            });

        roleDtoType.addMappings(mapper -> {
            mapper.using((MappingContext<Set<PermissionDto>, Set<Permission>> ctx) -> {
                    logger.info("Role User : source = {}", ctx.getSource());
                    return ctx.getSource() == null
                            ? null
                            : ctx.getSource()
                                .stream()
                                .map(permissionDto -> new Permission(
                                    permissionDto.getId(),
                                    permissionDto.getModule(),
                                    permissionDto.getAccess()
                                ))
                                .collect(Collectors.toSet());
                })
                .map(RoleDto::getPermissions, Role::setPermissions);
        });
    }

    @Override
    public RoleDto convertRoleToRoleDto(Role role) {
        logger.info("Role to transform : name = {}, id = {}, code = {}", role.getName(), role.getId());
        return modelMapper.map(role, RoleDto.class);
    }

    @Override
    public Role convertRoleDtoToRole(RoleDto roleDto) {
        return modelMapper.map(roleDto, Role.class);
    }
}
