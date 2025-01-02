package com.yogaforex.backend.models;

import com.yogaforex.backend.enums.ETransactionType;
import com.yogaforex.backend.enums.ETransactionStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
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

@Entity
@Table( name = "transactions" )
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ticket_seq")
    @SequenceGenerator(name = "ticket_seq", sequenceName = "ticket_number_seq", allocationSize = 1)
    @Column(unique = true, nullable = false)
    private Long ticketNumber;

    @Size(max = 50)
    @Column( name="permit_number", nullable = false)
    private String permitNumber;

    @Column( name = "transaction_type")
    private ETransactionType transactionType;

    @Column( name = "transaction_status")
    private ETransactionStatus ETransactionStatus;

    private Double totalAmount;

    @CreatedDate
    @Column(updatable = false) // Ensure it's not updated
    private LocalDateTime createDate;

    @LastModifiedDate
    private LocalDateTime updateDate;

    @OneToOne
    @JoinColumn( name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn( name = "customer_id")
    private Customer customer;

    @OneToMany( mappedBy = "transaction", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<TransactionItem> transactionItems = new HashSet<>();

}
