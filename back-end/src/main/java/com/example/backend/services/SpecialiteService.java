package com.example.backend.services;

import com.example.backend.models.Specialite;
import com.example.backend.repositories.SpecialiteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpecialiteService {
    private final SpecialiteRepository specialiteRepository;

    public SpecialiteService(SpecialiteRepository specialiteRepository) {
        this.specialiteRepository = specialiteRepository;
    }

    public List<Specialite> getAllSpecialites() {
        return specialiteRepository.findAll();
    }

    public Specialite addSpecialite(Specialite specialite) {
        return specialiteRepository.save(specialite);
    }
}
