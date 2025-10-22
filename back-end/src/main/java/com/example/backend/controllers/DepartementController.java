package com.example.backend.controllers;


import com.example.backend.models.Departement;
import com.example.backend.services.DepartementService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/departements")
public class DepartementController {
    private final DepartementService departementService;

    public DepartementController(DepartementService departementService) {
        this.departementService = departementService;
    }

    @GetMapping
    public List<Departement> getAllDepartements() {
        return departementService.getAllDepartements();
    }

    @PostMapping
    public Departement addDepartement(@RequestBody Departement departement) {
        return departementService.addDepartement(departement);
    }
}
