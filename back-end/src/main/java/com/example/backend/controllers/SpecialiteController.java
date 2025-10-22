package com.example.backend.controllers;


import com.example.backend.models.Specialite;
import com.example.backend.services.SpecialiteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/specialites")
public class SpecialiteController {
    private final SpecialiteService specialiteService;

    public SpecialiteController(SpecialiteService specialiteService) {
        this.specialiteService = specialiteService;
    }

    @GetMapping
    public List<Specialite> getAllSpecialites() {
        return specialiteService.getAllSpecialites();
    }

    @PostMapping
    public Specialite addSpecialite(@RequestBody Specialite specialite) {
        return specialiteService.addSpecialite(specialite);
    }
}
