package com.yogaforex.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table( name = "reports_internal" )
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReportInternal {

    @Id
    @GeneratedValue
    @UuidGenerator
    @Column(updatable = false, nullable = false)
    private UUID id;

    @CreatedDate
    @Column(updatable = false) // Ensure it's not updated
    private LocalDateTime createDate;

    private String title;

    private String description;

    @Column(name = "total_amount")
    private Double totalAmount;

    @Column(name = "total_purchase_price")
    private Double totalPurchasePrice;

    @Column(name = "total_before_service_charge")
    private Double totalBeforeServiceCharge;

    @Column(name = "total_service_charge_amount")
    private Double totalServiceChargeAmount;

    @Column(name = "total_VAT")
    private Double totalVAT;

    @Column(name = "total_amount_collected")
    private Double totalAmountCollected;

    @Column(name = "total_gross_revenue")
    private Double totalGrossRevenue;

    @OneToMany(mappedBy = "reportInternal", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ReportInternalItem> reportInternalItems = new HashSet<>();
}
