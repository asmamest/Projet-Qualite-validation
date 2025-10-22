package com.example.backend.controllers;

import com.example.backend.models.Groupe;
import com.example.backend.services.GroupeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/groupes")
public class GroupeController {
    private final GroupeService groupeService;

    public GroupeController(GroupeService groupeService) {
        this.groupeService = groupeService;
    }

    @GetMapping
    public List<Groupe> getAllGroupes() {
        return groupeService.getAllGroupes();
    }

    @PostMapping
    public Groupe addGroupe(@RequestBody Groupe groupe) {
        return groupeService.addGroupe(groupe);
    }
}
