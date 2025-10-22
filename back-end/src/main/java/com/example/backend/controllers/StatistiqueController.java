package com.example.backend.controllers;

import com.example.backend.dto.response.StatistiqueDTO;
import com.example.backend.services.MatiereService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/statistiques")
@CrossOrigin(origins = "http://localhost:4200")
public class StatistiqueController {
    private final MatiereService matiereService;

    public StatistiqueController(MatiereService matiereService) {
        this.matiereService = matiereService;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<StatistiqueDTO> getDashboardStats() {
        StatistiqueDTO stats = matiereService.getDashboardStats();
        return ResponseEntity.ok(stats);
    }
}
