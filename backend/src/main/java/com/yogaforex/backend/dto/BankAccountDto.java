package com.yogaforex.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BankAccountDto {
    private UUID id;
    private String bankName;
    private String accountNumber;
    private String createdAt;
    private String updatedAt;
}
