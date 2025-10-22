package com.example.backend.services;

import com.example.backend.models.Groupe;
import com.example.backend.repositories.GroupeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupeService {
    private final GroupeRepository groupeRepository;

    public GroupeService(GroupeRepository groupeRepository) {
        this.groupeRepository = groupeRepository;
    }

    public List<Groupe> getAllGroupes() {
        return groupeRepository.findAll();
    }

    public Groupe addGroupe(Groupe groupe) {
        return groupeRepository.save(groupe);
    }
}
