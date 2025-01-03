package com.yogaforex.backend.service;


import com.yogaforex.backend.dto.UserDto;
import com.yogaforex.backend.dto.UserPublicDto;
import com.yogaforex.backend.models.User;
import org.springframework.data.domain.Page;

import java.util.Optional;
import java.util.UUID;

public interface UserService {
    Optional<User> getByEmail(String email);
    Page<User> getAllUsers(int pageNumber, int pageSize);
    Optional<User> getByUsername(String username);
    Optional<User> getById(UUID id);
    User updateUser(UUID userId, User user);
    void deleteUser(UUID userId);

    User addRoleToUser(UUID userId, UUID roleId);
    User removeRoleFromUser(UUID userId, UUID roleId);

    UserPublicDto convertUserToPublicDto(User user);
    User convertUserDtoToUser(UserDto user);
    User convertPublicDtoToUser(UserPublicDto user);

}
