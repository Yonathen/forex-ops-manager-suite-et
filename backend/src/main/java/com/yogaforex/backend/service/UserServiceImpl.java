package com.yogaforex.backend.service;

import com.yogaforex.backend.dto.PermissionDto;
import com.yogaforex.backend.dto.RoleDto;
import com.yogaforex.backend.dto.UserPublicDto;
import com.yogaforex.backend.models.Branch;
import com.yogaforex.backend.models.Role;
import com.yogaforex.backend.models.User;
import com.yogaforex.backend.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.modelmapper.spi.MappingContext;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public UserServiceImpl(UserRepository userRepository, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
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
    public Optional<List<User>> getUsersByBranch(Branch branch) {
        return userRepository.findAllByBranch(branch);
    }

    @Override
    @Transactional
    public User updateUser(UUID id, User user) {
        return userRepository.findById(id).map(existingUser -> {
            existingUser.setUsername(user.getUsername());
            existingUser.setEmail(user.getEmail());
            existingUser.setPassword(user.getPassword());
            existingUser.setFirstName(user.getFirstName());
            existingUser.setLastName(user.getLastName());
            existingUser.setBranch(user.getBranch());
            existingUser.setStatus(user.getStatus());
            existingUser.setRoles(user.getRoles());
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
        typeMap.addMappings(mapper -> {
            mapper.using((MappingContext<Set<Role>, Set<RoleDto>> ctx) ->
                    ctx.getSource() == null
                        ? null
                        : ctx.getSource()
                            .stream()
                            .map(role -> new RoleDto(
                                role.getId(),
                                role.getName(),
                                role.getPermissions().stream()
                                    .map(permission -> new PermissionDto(permission.getId(), permission.getModule(), permission.getAccess()))
                                    .collect(Collectors.toSet())
                            ))
                            .collect(Collectors.toSet())
                )
                .map(User::getRoles, UserPublicDto::setRoles);
        });
    }

    @Override
    public UserPublicDto convertToPublicDto(User user) {
        return modelMapper.map(user, UserPublicDto.class);
    }
}
