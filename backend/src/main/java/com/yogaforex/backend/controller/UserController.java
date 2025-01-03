package com.yogaforex.backend.controller;

import com.yogaforex.backend.dto.PaginatedResponseDTO;
import com.yogaforex.backend.dto.UserDto;
import com.yogaforex.backend.dto.UserPublicDto;
import com.yogaforex.backend.models.User;
import com.yogaforex.backend.service.BranchService;
import com.yogaforex.backend.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

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
        List<UserPublicDto> allUsersDto = paginatedResult
            .stream()
            .map(userService::convertToPublicDto)
            .toList();

        return ResponseEntity.ok(
          new PaginatedResponseDTO<UserPublicDto>(
                  allUsersDto,
                  paginatedResult.getNumber(),
                  paginatedResult.getSize(),
                  paginatedResult.getTotalElements()
          )
        );
    }

}
