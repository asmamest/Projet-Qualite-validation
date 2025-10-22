package com.example.backend.models;

import com.example.backend.enumeration.DepartementEnum;
import jakarta.persistence.*;

@Entity
public class Departement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private DepartementEnum nom;

}
