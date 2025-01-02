package com.yogaforex.backend.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;
@Entity
@Table( name = "reports_of_sales" )
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReportSales extends Report {

    @OneToMany(mappedBy = "reportSales", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ReportSalesItem> reportSalesItems = new HashSet<>();
}
