package com.yogaforex.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table( name = "transaction_items" )
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TransactionItem {

    @Id
    @GeneratedValue
    @UuidGenerator
    @Column(updatable = false, nullable = false)
    private UUID id;

    @OneToOne
    @JoinColumn( name = "exchange_rate_id" )
    private ExchangeRate exchangeRate;

    private Double amount;

    @CreatedDate
    @Column(updatable = false) // Ensure it's not updated
    private LocalDateTime createDate;

    @LastModifiedDate
    private LocalDateTime updateDate;

    @ManyToOne
    @JoinColumn( name = "transaction_id" )
    private Transaction transaction;
}
