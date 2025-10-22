package com.example.backend.services;

import com.example.backend.dto.request.DateGlobaleDTO;
import com.example.backend.dto.response.DateGlobaleResponseDTO;
import com.example.backend.models.DateGlobale;
import com.example.backend.repositories.DateGlobaleRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DateGlobaleService {
    private final DateGlobaleRepository dateGlobaleRepository;

    public DateGlobaleService(DateGlobaleRepository dateGlobaleRepository) {
        this.dateGlobaleRepository = dateGlobaleRepository;
    }

    @Transactional
    public DateGlobaleResponseDTO saveDateGlobale(DateGlobaleDTO dateGlobaleDTO) {
        // Si une date avec ce nom existe déjà, on la désactive
        dateGlobaleRepository.findByNom(dateGlobaleDTO.getNom())
                .ifPresent(existingDate -> {
                    existingDate.setActive(false);
                    dateGlobaleRepository.save(existingDate);
                });

        // Création de la nouvelle date
        DateGlobale dateGlobale = new DateGlobale();
        dateGlobale.setNom(dateGlobaleDTO.getNom());
        dateGlobale.setDate(dateGlobaleDTO.getDate());
        dateGlobale.setDescription(dateGlobaleDTO.getDescription());
        dateGlobale.setActive(true);

        DateGlobale savedDate = dateGlobaleRepository.save(dateGlobale);
        return toResponseDTO(savedDate);
    }

    public DateGlobaleResponseDTO getActiveDateGlobale(String nom) {
        DateGlobale dateGlobale = dateGlobaleRepository.findByNomAndActiveTrue(nom)
                .orElseThrow(() -> new EntityNotFoundException("Date globale active non trouvée: " + nom));
        return toResponseDTO(dateGlobale);
    }

    public List<DateGlobaleResponseDTO> getAllDatesGlobales() {
        return dateGlobaleRepository.findAll().stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    private DateGlobaleResponseDTO toResponseDTO(DateGlobale dateGlobale) {
        DateGlobaleResponseDTO dto = new DateGlobaleResponseDTO();
        dto.setId(dateGlobale.getId());
        dto.setNom(dateGlobale.getNom());
        dto.setDate(dateGlobale.getDate());
        dto.setDescription(dateGlobale.getDescription());
        dto.setActive(dateGlobale.isActive());
        return dto;
    }
}
