

package com.example.backend.controllers;

import com.example.backend.dto.request.EnseignantDTO;
import com.example.backend.dto.response.EnseignantResponseDTO;
import com.example.backend.enumeration.*;
import com.example.backend.services.EnseignantService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enseignants")
public class EnseignantController {
    private final EnseignantService enseignantService;

    public EnseignantController(EnseignantService enseignantService) {
        this.enseignantService = enseignantService;
    }

    @PostMapping
    public ResponseEntity<EnseignantResponseDTO> saveEnseignant(@RequestBody EnseignantDTO enseignantDTO) {
        try {
            EnseignantResponseDTO savedEnseignant = enseignantService.saveEnseignant(enseignantDTO);
            return ResponseEntity.ok(savedEnseignant);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/filter")
    public List<EnseignantResponseDTO> getEnseignantsByFilters(
            @RequestParam DepartementEnum departement,
            @RequestParam SpecialiteEnum specialite,
            @RequestParam NiveauEnum niveau,
            @RequestParam GroupeEnum groupe,
            @RequestParam SemesterEnum semester ) {

        return enseignantService.getEnseignantsByFilters(departement, specialite, niveau, groupe,semester);
    }

    @GetMapping
    public List<EnseignantResponseDTO> getAllEnseignants() {
        return enseignantService.getAllEnseignants();
    }




    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEnseignant(@PathVariable Long id) {
        try {
            enseignantService.deleteEnseignant(id);
            return ResponseEntity.ok().build();
        } catch (jakarta.persistence.EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAllEnseignant() {
        enseignantService.deleteAllEnseignants();
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/stat")
    public ResponseEntity<Integer> getEnseignantStats(
            @RequestParam DepartementEnum dep,
            @RequestParam SpecialiteEnum spec)
     {
        Integer stats = enseignantService.enseignant_stat(dep, spec);
        return ResponseEntity.ok(stats);
    }

}
