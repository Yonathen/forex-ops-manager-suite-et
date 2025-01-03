package com.yogaforex.backend.dto;

import com.yogaforex.backend.enums.EStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserPublicDto {
    private UUID id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private EStatus status;
    private Set<RoleDto> roles;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
}

