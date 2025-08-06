package com.yogaforex.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table( name = "reports_of_purchase" )
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReportPurchase extends Report {
    @OneToMany(mappedBy = "reportPurchase", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ReportPurchaseItem> reportItems = new HashSet<>();
}
