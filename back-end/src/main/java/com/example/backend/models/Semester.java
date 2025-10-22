package com.example.backend.models;


import com.example.backend.enumeration.SemesterEnum;
import jakarta.persistence.*;
@Entity
public class Semester {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private SemesterEnum semester;
}
