package com.example.backend.controllers;

import com.example.backend.models.Semester;
import com.example.backend.models.TypeMatiere;
import com.example.backend.services.SemesterService;
import com.example.backend.services.TypeMatiereService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public class TypeMatiereController {
    private final TypeMatiereService TypeMatiereService;

    public TypeMatiereController(TypeMatiereService TypeMatiereService) {
        this.TypeMatiereService = TypeMatiereService;
    }

    @GetMapping
    public List<TypeMatiere> getAllTypeMatiere() {
        return TypeMatiereService.getAllTypeMatiere();
    }

    @PostMapping
    public TypeMatiere addTypeMatiere(@RequestBody TypeMatiere TypeMatiere) {
        return TypeMatiereService.addTypeMatiere(TypeMatiere);
    }
}
