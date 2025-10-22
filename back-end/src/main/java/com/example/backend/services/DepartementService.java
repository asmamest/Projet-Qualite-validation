package com.example.backend.services;


import com.example.backend.models.Departement;
import com.example.backend.repositories.DepartementRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartementService {
    private final DepartementRepository departementRepository;

    public DepartementService(DepartementRepository departementRepository) {
        this.departementRepository = departementRepository;
    }

    public List<Departement> getAllDepartements() {
        return departementRepository.findAll();
    }

    public Departement addDepartement(Departement departement) {
        return departementRepository.save(departement);
    }
}
