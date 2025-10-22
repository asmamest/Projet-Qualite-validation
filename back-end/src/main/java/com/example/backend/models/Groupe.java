package com.example.backend.models;

import com.example.backend.enumeration.GroupeEnum;
import jakarta.persistence.*;


import java.util.Set;

@Entity
public class Groupe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private GroupeEnum nom;
}
