package com.yogaforex.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JwtDto {
    private String token;
    private UUID id;
    private String username;
    private String email;
    private List<String> roles;
    private String type = "Bearer";
}
