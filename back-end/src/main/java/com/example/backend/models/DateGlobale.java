package com.example.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DateGlobale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String nom;

    private LocalDateTime date;

    private String description;

    private boolean active = true;

    // Types prédéfinis pour les dates globales
    public static final String DATE_RECEPTION = "DATE_RECEPTION";
    public static final String DATE_VALIDATION = "DATE_VALIDATION";
}
