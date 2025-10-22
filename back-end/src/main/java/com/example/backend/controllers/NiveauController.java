package com.example.backend.controllers;

import com.example.backend.models.Niveau;
import com.example.backend.services.NiveauService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public class NiveauController {
    private final NiveauService niveauService;

    public NiveauController(NiveauService niveauService) {
        this.niveauService = niveauService;
    }

    @GetMapping
    public List<Niveau> getAllNiveau() {
        return niveauService.getAllNiveau();
    }

    @PostMapping
    public Niveau addNiveau(@RequestBody Niveau niveau) {
        return niveauService.addNiveau(niveau);
    }
}
