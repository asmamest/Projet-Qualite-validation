package com.example.backend.controllers;

import com.example.backend.dto.request.DateGlobaleDTO;
import com.example.backend.dto.response.DateGlobaleResponseDTO;
import com.example.backend.models.DateGlobale;
import com.example.backend.services.DateGlobaleService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dates-globales")
@CrossOrigin(origins = "http://localhost:4200")
public class DateGlobaleController {
    private final DateGlobaleService dateGlobaleService;

    public DateGlobaleController(DateGlobaleService dateGlobaleService) {
        this.dateGlobaleService = dateGlobaleService;
    }

    @PostMapping
    public ResponseEntity<DateGlobaleResponseDTO> saveDateGlobale(@RequestBody DateGlobaleDTO dateGlobaleDTO) {
        DateGlobaleResponseDTO savedDate = dateGlobaleService.saveDateGlobale(dateGlobaleDTO);
        return ResponseEntity.ok(savedDate);
    }

    @GetMapping("/{nom}")
    public ResponseEntity<DateGlobaleResponseDTO> getActiveDateGlobale(@PathVariable String nom) {
        try {
            DateGlobaleResponseDTO dateGlobale = dateGlobaleService.getActiveDateGlobale(nom);
            return ResponseEntity.ok(dateGlobale);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<DateGlobaleResponseDTO>> getAllDatesGlobales() {
        List<DateGlobaleResponseDTO> dates = dateGlobaleService.getAllDatesGlobales();
        return ResponseEntity.ok(dates);
    }

    @GetMapping("/types")
    public ResponseEntity<List<String>> getDateTypes() {
        List<String> types = List.of(
                DateGlobale.DATE_RECEPTION,
                DateGlobale.DATE_VALIDATION
        );
        return ResponseEntity.ok(types);
    }
}
