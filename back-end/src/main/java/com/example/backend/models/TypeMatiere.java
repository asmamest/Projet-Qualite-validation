package com.example.backend.models;

import com.example.backend.enumeration.SpecialiteEnum;
import com.example.backend.enumeration.TypeMatiereEnum;
import jakarta.persistence.*;
@Entity
public class TypeMatiere {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private TypeMatiereEnum TypeMatiere;
}
