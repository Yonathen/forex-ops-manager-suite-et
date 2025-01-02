package com.yogaforex.backend.models;

import com.yogaforex.backend.enums.EPaymentMethod;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.util.UUID;

@Entity
@Table(
        name = "payment_methods"
)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentMethod {

    @Id
    @GeneratedValue
    @UuidGenerator
    @Column(updatable = false, nullable = false)
    private UUID id;

    @Column( name = "payment_method" )
    private EPaymentMethod paymentMethod;

    @Column( name = "account_number" )
    private String accountNumber;

    @CreatedDate
    @Column(updatable = false)
    private String createdAt;

    @LastModifiedDate
    private String updatedAt;

    @ManyToOne
    @JoinColumn( name = "customer_id")
    private Customer customer;
}
