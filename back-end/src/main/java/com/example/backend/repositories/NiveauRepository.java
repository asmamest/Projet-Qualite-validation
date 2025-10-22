package com.example.backend.repositories;

import com.example.backend.models.Niveau;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NiveauRepository extends JpaRepository<Niveau, Long> {
}
