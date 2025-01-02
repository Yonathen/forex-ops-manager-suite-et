package com.yogaforex.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

@Entity
@Table( name = "currencies" )
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Currency {

    @Id
    @GeneratedValue
    @UuidGenerator
    @Column(updatable = false, nullable = false)
    private UUID id;

    @Size(max = 3)
    @Column( name="currency_code", nullable = false)
    private String currencyCode;

    @Size(max = 50)
    @Column( name="currency_name", nullable = false)
    private String currencyName;

    @Size(max = 50)
    @Column( name="country", nullable = false)
    private String country;

}
