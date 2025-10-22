package com.example.backend.repositories;

import com.example.backend.models.Niveau;
import com.example.backend.models.Semester;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SemesterRepository extends JpaRepository<Semester, Long> {
}
