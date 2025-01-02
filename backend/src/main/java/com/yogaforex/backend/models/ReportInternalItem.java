package com.yogaforex.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;
import java.util.UUID;


@Entity
@Table( name = "report_internal_items" )
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReportInternalItem {

    @Id
    @GeneratedValue
    @UuidGenerator
    @Column(updatable = false, nullable = false)
    private UUID id;

    private Double amount;

    @Column(name = "purchase_date", nullable = false )
    private LocalDateTime purchaseDate;

    @Column(name = "purchase_exchange_rate")
    private Double purchaseExchangeRate;

    @Column(name = "purchase_price")
    private Double purchasedPrice;

    @Column(name = "selling_exchange_rate")
    private Double sellingExchangeRate;

    @Column(name = "sub_total_before_service_charge")
    private Double subTotalBeforeServiceCharge;

    @Column(name = "service_charge_percentage")
    private Double serviceChargePercentage;

    @Column(name = "service_charge_amount")
    private Double serviceChargeAmount;

    @Column(name = "VAT")
    private Double VAT;

    @Column(name = "amount_collected")
    private Double amountCollected;

    @Column(name = "gross_revenue")
    private Double grossRevenue;

    @Column(name = "selling_final_exchange_rate")
    private Double sellingFinalExchangeRate;

    @ManyToOne
    @JoinColumn( name = "report_internal_id")
    private ReportInternal reportInternal;
}
