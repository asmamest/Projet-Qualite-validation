package com.example.backend.repositories;

import com.example.backend.enumeration.*;
import com.example.backend.models.Enseignant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface EnseignantRepository extends JpaRepository<Enseignant, Long> {
    List<Enseignant> findByDepartementAndSpecialiteAndNiveauAndGroupeAndSemester(
            DepartementEnum departement,
            SpecialiteEnum specialite,
            NiveauEnum niveau,
            GroupeEnum groupe,
            SemesterEnum semester);


    Optional<List<Enseignant>> findByDepartementAndSpecialite(DepartementEnum departement, SpecialiteEnum specialite);




    // Update Asma
/*
    @Query("SELECT COUNT(e) FROM Enseignant e")
    long countTotalTeachers();

    @Query("SELECT COUNT(e) FROM Enseignant e WHERE e.isLate = true")
    long countLateTeachers(); */


}
