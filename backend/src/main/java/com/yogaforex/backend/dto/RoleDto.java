package com.yogaforex.backend.dto;

import com.yogaforex.backend.enums.ERole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoleDto {
    private UUID roleId;
    private ERole name;
    private Set<PermissionDto> permissions;
}
