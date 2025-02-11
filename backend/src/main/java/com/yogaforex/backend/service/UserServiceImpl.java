package com.yogaforex.backend.service;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.modelmapper.spi.MappingContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yogaforex.backend.dto.PermissionDto;
import com.yogaforex.backend.dto.RoleDto;
import com.yogaforex.backend.dto.UserDto;
import com.yogaforex.backend.dto.UserPublicDto;
import com.yogaforex.backend.models.Permission;
import com.yogaforex.backend.models.Role;
import com.yogaforex.backend.models.User;
import com.yogaforex.backend.repository.RoleRepository;
import com.yogaforex.backend.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final RoleRepository roleRepository;
    public static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    public UserServiceImpl(UserRepository userRepository, ModelMapper modelMapper, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.roleRepository = roleRepository;
        configureMappings();
    }

    @Override
    public Optional<User> getByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Optional<User> getByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Optional<User> getById(UUID id) {
        return userRepository.findById(id);
    }

    @Override
    public Page<User> getAllUsers(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize); // Create Pageable instance
        return userRepository.findAll(pageable);
    }

    @Override
    public User addRoleToUser(UUID userId, UUID roleId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role not found with ID: " + roleId));

        user.getRoles().add(role);
        return userRepository.save(user);
    }

    @Override
    public User removeRoleFromUser(UUID userId, UUID roleId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role not found with ID: " + roleId));

        user.getRoles().remove(role);
        return userRepository.save(user);
    }

    @Override
    @Transactional
    public User updateUser(UUID id, User user) {
        return userRepository.findById(id).map(existingUser -> {
            existingUser.setUsername(user.getUsername());
            existingUser.setEmail(user.getEmail());
            existingUser.setFirstName(user.getFirstName());
            existingUser.setLastName(user.getLastName());
            existingUser.setBranch(user.getBranch());
            existingUser.setStatus(user.getStatus());
            existingUser.setAddress(user.getAddress());
            existingUser.setLastName(user.getLastName());

            return userRepository.save(existingUser);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    @Transactional
    public void deleteUser(UUID id) {
        userRepository.deleteById(id);
    }

    private void configureMappings() {
        TypeMap<User, UserPublicDto> typeMap = modelMapper.typeMap(User.class, UserPublicDto.class);
        TypeMap<UserDto, User> userDtoTypeMap = modelMapper.typeMap(UserDto.class, User.class);
        TypeMap<UserPublicDto, User> userPublicDtoTypeMap = modelMapper.typeMap(UserPublicDto.class, User.class);
        typeMap.addMappings(mapper -> {
            mapper.using((MappingContext<Set<Role>, Set<RoleDto>> ctx) ->
                            ctx.getSource() == null
                                    ? null
                                    : ctx.getSource()
                                    .stream()
                                    .map(role -> new RoleDto(
                                            role.getId(),
                                            role.getName(),
                                            role.getPermissions()
                                                .stream()
                                                .map(permission -> new PermissionDto(permission.getId(), permission.getModule(), permission.getAccess()))
                                                .collect(Collectors.toSet())
                                    ))
                                    .collect(Collectors.toSet())
                    )
                    .map(User::getRoles, UserPublicDto::setRoles);
        });

        userPublicDtoTypeMap.addMappings(mapper -> {
            mapper.using((MappingContext<Set<RoleDto>, Set<Role>> ctx) ->
                            ctx.getSource() == null
                                    ? null
                                    : ctx.getSource()
                                    .stream()
                                    .map(role -> new Role(
                                            role.getId(),
                                            role.getName(),
                                            role.getPermissions()
                                                    .stream()
                                                    .map(permission -> new Permission(permission.getId(), permission.getModule(), permission.getAccess()))
                                                    .collect(Collectors.toSet())
                                    ))
                                    .collect(Collectors.toSet())
                    )
                    .map(UserPublicDto::getRoles, User::setRoles);
        });

        userDtoTypeMap.addMappings(mapper -> {
            mapper.using((MappingContext<Set<RoleDto>, Set<Role>> ctx) ->
                            ctx.getSource() == null
                                    ? null
                                    : ctx.getSource()
                                    .stream()
                                    .map(role -> new Role(
                                            role.getId(),
                                            role.getName(),
                                            role.getPermissions()
                                                    .stream()
                                                    .map(permission -> new Permission(permission.getId(), permission.getModule(), permission.getAccess()))
                                                    .collect(Collectors.toSet())
                                    ))
                                    .collect(Collectors.toSet())
                    )
                    .map(UserDto::getRoles, User::setRoles);
        });
    }

    @Override
    public UserPublicDto convertUserToPublicDto(User user) {
        logger.info("User to transform : name = {} : id = {}", user.getUsername(), user.getId());
        return modelMapper.map(user, UserPublicDto.class);
    }

    @Override
    public User convertUserDtoToUser(UserDto userDto) {
        return modelMapper.map(userDto, User.class);
    }

    @Override
    public User convertPublicDtoToUser(UserPublicDto userDto) {
        return modelMapper.map(userDto, User.class);
    }
}
