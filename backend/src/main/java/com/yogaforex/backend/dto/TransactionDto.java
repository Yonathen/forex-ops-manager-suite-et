package com.yogaforex.backend.dto;

import com.yogaforex.backend.enums.EPaymentMethodType;
import com.yogaforex.backend.enums.ETransactionStatus;
import com.yogaforex.backend.enums.ETransactionType;
import com.yogaforex.backend.models.*;
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
public class TransactionDto {
    private Long ticketNumber;
    private String permitNumber;
    private ETransactionType transactionType;
    private ETransactionStatus transactionStatus;
    private Double totalAmount;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
    private User user;
    private Customer customer;
    private Set<TransactionItem> transactionItems = new HashSet<>();
    private TravelDocument travelDocument;
    private EPaymentMethodType paymentMethodType;
    private BankAccount bankAccount;
}
