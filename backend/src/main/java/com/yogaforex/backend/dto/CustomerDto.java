package com.yogaforex.backend.dto;

import com.yogaforex.backend.enums.EIdentificationType;
import com.yogaforex.backend.models.Address;
import com.yogaforex.backend.models.BankAccount;
import com.yogaforex.backend.models.Transaction;
import com.yogaforex.backend.models.User;
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
public class CustomerDto {
    private UUID id;
    private String firstName;
    private String middleName;
    private String lastName;
    private Address address;
    private LocalDateTime dateOfBirth;
    private EIdentificationType identificationType;
    private String identificationNumber;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
    private User user;
    private Set<BankAccount> bankAccounts = new HashSet<>();
    private Set<Transaction> transactions = new HashSet<>();
}
