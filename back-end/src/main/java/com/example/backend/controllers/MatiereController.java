package com.example.backend.controllers;

import com.example.backend.dto.UpdateStatusRequest;
import com.example.backend.dto.request.MatiereDTO;
import com.example.backend.dto.response.MatiereResponseDTO;
import com.example.backend.enumeration.DepartementEnum;
import com.example.backend.enumeration.NiveauEnum;
import com.example.backend.enumeration.SpecialiteEnum;
import com.example.backend.mapper.MatiereMapper;
import com.example.backend.models.Matiere;
import com.example.backend.services.MatiereService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/matieres")
@CrossOrigin(origins = "http://localhost:4200")

public class MatiereController {
    private final MatiereService matiereService;
    private final MatiereMapper matiereMapper;

    public MatiereController(MatiereService matiereService, MatiereMapper matiereMapper) {
        this.matiereService = matiereService;
        this.matiereMapper = matiereMapper;
    }

    @PostMapping
    public MatiereResponseDTO saveMatiere(@RequestBody MatiereDTO matiereDTO) {
        return matiereMapper.toResponseDTO(matiereService.saveMatiere(matiereDTO));
    }

    @GetMapping
    public List<MatiereResponseDTO> getAllMatieres() {
        return matiereService.getAllMatieres();
    }

    @GetMapping("/enseignant/{enseignantId}")
    public List<MatiereResponseDTO> getMatieresByEnseignant(@PathVariable Long enseignantId) {
        return matiereService.getMatieresByEnseignant(enseignantId);
    }


    /// Asma Update
    ///
    @GetMapping("/valides")
    public ResponseEntity<List<Map<String, Object>>> getMatiereValideStats() {
        return ResponseEntity.ok(matiereService.getFormattedMatiereStats());
    }

    // Endpoint pour récupérer les matières récemment mises à jour
    @GetMapping("/recent")
    public ResponseEntity<List<Matiere>> getRecentUpdates() {
        List<Matiere> recentMatieres = matiereService.findRecentUpdates();
        return ResponseEntity.ok(recentMatieres);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id,
            @RequestBody UpdateStatusRequest request
    ) {
        matiereService.updateMatiereStatus(id, request.isRecu(), request.isValide());
        return ResponseEntity.ok().body("Statut mis à jour avec succès.");
    }

    @GetMapping("/stats")

    public ResponseEntity<List<Double>> getMatiereStats(
            @RequestParam DepartementEnum dep,
            @RequestParam SpecialiteEnum spec,
            @RequestParam NiveauEnum niv
    ) {
        List<Double> stats = matiereService.matieres_stat(dep, spec, niv);
        return ResponseEntity.ok(stats);
    }


}

