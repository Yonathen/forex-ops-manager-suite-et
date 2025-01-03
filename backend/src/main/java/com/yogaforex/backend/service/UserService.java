package com.yogaforex.backend.service;

import com.yogaforex.backend.models.Branch;
import com.yogaforex.backend.models.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserService {
    Optional<User> getByEmail(String email);
    Optional<User> getByUsername(String username);
    Optional<User> getById(UUID id);
    Optional<List<User>> getUsersByBranch(Branch branch);
    User updateUser(UUID userId, User user);
    void deleteUser(UUID userId);
}
