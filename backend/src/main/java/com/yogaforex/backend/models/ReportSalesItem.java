package com.yogaforex.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table( name = "report_sales_items" )
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReportSalesItem {
    @Id
    @GeneratedValue
    @UuidGenerator
    @Column(updatable = false, nullable = false)
    private UUID id;

    private Double amount;

    @Column(name = "transaction_date", nullable = false )
    private LocalDateTime transactionDate;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @Column(name = "ticker_reference_number")
    private Long tickerReferenceNumber;

    @ManyToOne
    @JoinColumn(name = "currency_id")
    private Currency currency;

    @Column(name = "FCY_amount")
    private Double FCYAmount;

    @Column(name = "exchange_rate")
    private Double exchangeRate;

    @Column(name = "LCY_amount")
    private Double LCYAmount;

    @Size(max = 50)
    @Column(name = "permit_number")
    private String permitNumber;

    @Column(name = "payment_purpose")
    private String paymentPurpose;

    @ManyToOne
    @JoinColumn( name = "report_sales_id")
    private ReportSales reportSales;
}
