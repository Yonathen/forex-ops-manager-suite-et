package com.yogaforex.backend.controller;

import com.yogaforex.backend.dto.PaginatedResponseDTO;
import com.yogaforex.backend.dto.UserDto;
import com.yogaforex.backend.dto.UserPublicDto;
import com.yogaforex.backend.models.User;
import com.yogaforex.backend.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    public static final Logger logger = LoggerFactory.getLogger(UserController.class);

    public UserController(
            UserService userService
    ) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<PaginatedResponseDTO<UserPublicDto>> fetchAllUsers(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        Page<User> paginatedResult = userService.getAllUsers(page, size);
        logger.info("Fetched paginatedResult : {}", paginatedResult);
        List<UserPublicDto> allUsersDto = paginatedResult
            .stream()
            .map(userService::convertUserToPublicDto)
            .toList();
        logger.info("Users after transforming to Public DTO : {}", allUsersDto);

        return ResponseEntity.ok(
          new PaginatedResponseDTO<UserPublicDto>(
                  allUsersDto,
                  paginatedResult.getNumber(),
                  paginatedResult.getSize(),
                  paginatedResult.getTotalElements()
          )
        );
    }

    @GetMapping("/by-email/{email}")
    public ResponseEntity<UserPublicDto> fetchAllUsersByEmail(@PathVariable String email) {
        Optional<User> user = userService.getByEmail(email);

        if (user.isEmpty()) {
            logger.info("User with email {} not found", email);
            return ResponseEntity.notFound().build();
        }

        logger.info("Fetched user by email before transform to public DTO : {}", user.get());
        return ResponseEntity.ok(userService.convertUserToPublicDto(user.get()));
    }

    @GetMapping("/by-username/{username}")
    public ResponseEntity<UserPublicDto> fetchAllUsersByUsername(@PathVariable String username) {
        Optional<User> user = userService.getByUsername(username);
        if (user.isEmpty()) {
            logger.info("User with username {} not found", username);
            return ResponseEntity.notFound().build();
        }

        logger.info("Fetched user by username before transform to public DTO : {}", user.get());
        return ResponseEntity.ok(userService.convertUserToPublicDto(user.get()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserPublicDto> fetchUserById(@PathVariable UUID id) {
        Optional<User> user = userService.getById(id);
        if (user.isEmpty()) {
            logger.info("User with id {} not found", id);
            return ResponseEntity.notFound().build();
        }

        logger.info("Fetched user by id before transform to public DTO : {}", user.get());
        return ResponseEntity.ok(userService.convertUserToPublicDto(user.get()));
    }

    @PutMapping
    public ResponseEntity<UserPublicDto> updateUser(@RequestBody UserDto userDto) {
        Optional<User> user = userService.getById(userDto.getId());
        if (user.isEmpty()) {
            logger.info("User id {} for update not found", userDto.getId());
            return ResponseEntity.notFound().build();
        }

        logger.info("Updated user id before transform to public DTO : {}", userDto.getId());
        User userForUpdate = userService.convertUserDtoToUser(userDto);
        logger.info("Transformed user for update : {}", userForUpdate.toString());

        User updatedUser = userService.updateUser(userDto.getId(), userForUpdate);
        logger.info("Updated user id after transform to public DTO : {}", updatedUser.getId());

        return ResponseEntity.ok(userService.convertUserToPublicDto(updatedUser));
    }

    @PutMapping("/add-role/{userId}/{roleId}")
    public ResponseEntity<UserPublicDto> addRoleToUser(@PathVariable UUID userId, @PathVariable UUID roleId) {
        logger.info("Add role with role id of {} to user with user id of {}", userId, roleId);
        User updatedUser = userService.addRoleToUser(userId, roleId);
        return ResponseEntity.ok(userService.convertUserToPublicDto(updatedUser));
    }

    @PutMapping("/remove-role/{userId}/{roleId}")
    public ResponseEntity<UserPublicDto> removeRoleFromUser(@PathVariable UUID userId, @PathVariable UUID roleId) {
        logger.info("Remove role with role id of {} from user with user id of {}", userId, roleId);
        User updatedUser = userService.removeRoleFromUser(userId, roleId);
        return ResponseEntity.ok(userService.convertUserToPublicDto(updatedUser));
    }

    @DeleteMapping
    public ResponseEntity<UserPublicDto> deleteUser(@RequestBody UserDto userDto) {
        Optional<User> user = userService.getById(userDto.getId());
        if (user.isEmpty()) {
            logger.info("User id {} for delete is not found", userDto.getId());
            return ResponseEntity.notFound().build();
        }

        userService.deleteUser(userDto.getId());
        logger.info("Deleted user id : {}", userDto.getId());

        return ResponseEntity.ok(userService.convertUserToPublicDto(user.get()));
    }

}
