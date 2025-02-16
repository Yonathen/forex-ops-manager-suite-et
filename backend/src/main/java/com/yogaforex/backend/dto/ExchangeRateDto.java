package com.yogaforex.backend.dto;

import com.yogaforex.backend.enums.ETransactionType;
import com.yogaforex.backend.models.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ExchangeRateDto {
    private UUID id;
    private Currency baseCurrency;
    private Currency targetCurrency;
    private Double rate;
    private ETransactionType transactionType;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
}
