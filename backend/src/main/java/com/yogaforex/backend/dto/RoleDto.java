package com.yogaforex.backend.dto;

import java.util.Set;
import java.util.UUID;

import com.yogaforex.backend.enums.ERole;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoleDto {
    private UUID id;
    private ERole name;
    private Set<PermissionDto> permissions;
}
