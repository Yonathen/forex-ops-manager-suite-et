package com.yogaforex.backend.models;

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
@Table( name = "travel_doucments" )
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TravelDocument {

    @Id
    @GeneratedValue
    @UuidGenerator
    @Column(updatable = false, nullable = false)
    private UUID id;

    @Size(max = 50)
    @Column(name = "passport_number")
    private String passportNumber;

    @Size(max = 50)
    @Column(name = "nationality")
    private String nationality;

    @Size(max = 50)
    @Column(name = "air_ticket")
    private String airTicket;

    @Size(max = 50)
    @Column(name = "residence_id")
    private String residenceId;

    @Size(max = 50)
    @Column(name = "country_of_residence")
    private String countryOfResidence;

    @Size(max = 50)
    @Column(name = "residence_expires")
    private String residenceExpires;

    @Size(max = 50)
    @Column(name = "visa_number")
    private String visaNumber;

    @Size(max = 50)
    @Column(name = "visa_type")
    private String visaType;

    @Size(max = 50)
    @Column(name = "visa_issued_by")
    private String visaIssuedBy;

    @Column(name = "visa_issued_on")
    private LocalDateTime visaIssuedOn;

    @Size(max = 50)
    @Column(name = "visaValidity")
    private String visaValidity;

    @Column(name = "purposeOfTravel")
    private String purposeOfTravel;

    @CreatedDate
    @Column(updatable = false) // Ensure it's not updated
    private LocalDateTime createDate;

    @LastModifiedDate
    private LocalDateTime updateDate;

    @OneToOne
    @JoinColumn( name ="transaction_id")
    private Transaction transaction;

}
