package com.yogaforex.backend.dto;

import com.yogaforex.backend.enums.EAccess;
import com.yogaforex.backend.enums.EModule;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PermissionDto {
    private UUID id;
    private EModule module;
    private EAccess access;
}
