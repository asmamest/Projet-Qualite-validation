package com.example.backend.services;

import com.example.backend.models.Niveau;
import com.example.backend.repositories.NiveauRepository;

import java.util.List;

public class NiveauService {

    private final NiveauRepository niveauRepository;

    public NiveauService(NiveauRepository niveauRepository) {
        this.niveauRepository = niveauRepository;
    }

    public List<Niveau> getAllNiveau() {
        return niveauRepository.findAll();
    }

    public Niveau addNiveau(Niveau niveau) {
        return niveauRepository.save(niveau);
    }
}
