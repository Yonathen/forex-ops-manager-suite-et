package com.yogaforex.backend.dto;

import com.yogaforex.backend.enums.EIdentificationType;
import com.yogaforex.backend.models.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TransactionItemDto {
    private UUID id;
    private ExchangeRate exchangeRate;
    private Double amount;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
    private Transaction transaction;
}
