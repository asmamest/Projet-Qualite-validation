package com.example.backend.models;

import com.example.backend.enumeration.NiveauEnum;
import jakarta.persistence.*;
@Entity
public class Niveau {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private NiveauEnum nom;
}
