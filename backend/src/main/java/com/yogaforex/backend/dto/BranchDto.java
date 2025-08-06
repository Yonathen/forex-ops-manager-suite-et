package com.yogaforex.backend.dto;

import com.yogaforex.backend.models.Address;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BranchDto {
    private UUID id;
    private String branchCode;
    private String name;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
    private Address address;
    private Set<UserPublicDto> users = new HashSet<>();
}
