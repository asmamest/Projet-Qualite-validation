package com.example.backend.repositories;

import com.example.backend.models.DateGlobale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface DateGlobaleRepository extends JpaRepository<DateGlobale, Long> {
    Optional<DateGlobale> findByNom(String nom);
    Optional<DateGlobale> findByNomAndActiveTrue(String nom);
}
