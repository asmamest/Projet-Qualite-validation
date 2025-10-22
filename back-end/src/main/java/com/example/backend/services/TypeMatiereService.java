package com.example.backend.services;

import com.example.backend.models.Specialite;
import com.example.backend.models.TypeMatiere;
import com.example.backend.repositories.SpecialiteRepository;
import com.example.backend.repositories.TypeMatiereRepository;

import java.util.List;

public class TypeMatiereService {

    private final TypeMatiereRepository TypeMatiereRepository;

    public TypeMatiereService(TypeMatiereRepository TypeMatiereRepository) {
        this.TypeMatiereRepository = TypeMatiereRepository;
    }

    public List<TypeMatiere> getAllTypeMatiere() {
        return TypeMatiereRepository.findAll();
    }

    public TypeMatiere addTypeMatiere(TypeMatiere TypeMatiere) {
        return TypeMatiereRepository.save(TypeMatiere);
    }
}
