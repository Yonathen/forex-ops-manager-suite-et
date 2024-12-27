package com.yogaforex.backend.models;

import com.yogaforex.backend.enums.EAccess;
import com.yogaforex.backend.enums.EModule;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

@Entity
@Table(
        name = "permissions"
)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Permission {

    @Id
    @GeneratedValue
    @UuidGenerator
    private UUID id;

    @Enumerated(EnumType.STRING)
    private EModule module;

    @Enumerated(EnumType.STRING)
    private EAccess access;
}
