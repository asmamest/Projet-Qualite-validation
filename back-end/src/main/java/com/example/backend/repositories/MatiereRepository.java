package com.example.backend.repositories;

import com.example.backend.enumeration.DepartementEnum;
import com.example.backend.enumeration.NiveauEnum;
import com.example.backend.enumeration.SpecialiteEnum;
import com.example.backend.models.Matiere;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.hibernate.sql.ast.Clause.ORDER;
@Repository
public interface MatiereRepository extends JpaRepository<Matiere, Long> {
    List<Matiere> findByEnseignantId(Long enseignantId);
    void deleteByEnseignant_Id(Long enseignantId); // Ajouté



    /// Asma Update
    @Query("SELECT m.departement AS departement, " +
            "m.niveau AS niveau, " +
            "COUNT(*) AS total " +
            "FROM Matiere m " +
            "WHERE m.recu = true AND m.valide = true " +
            "GROUP BY m.departement, m.niveau " +
            "ORDER BY m.departement, m.niveau")
    List<Object[]> getMatiereValideByDepartementAndNiveau();
    @Modifying
    @Query("UPDATE Matiere m SET m.nomMatiere = :nomMatiere, m.updatedAt = CURRENT_TIMESTAMP WHERE m.id = :id")
    void updateMatiere(@Param("id") Long id, @Param("nomMatiere") String nomMatiere);

    List<Matiere> findByRecuTrueOrValideTrueOrderByUpdatedAtDesc();

    @Query("SELECT COUNT(m) FROM Matiere m WHERE m.valide = false")
    long countUnvalidatedSubjects();
    @Query("SELECT COUNT(m) FROM Matiere m WHERE m.recu = false")
    long countUnsubmittedSubjects();



    /////////////////////////
    Optional<Matiere> findByIdAndEnseignantId(Long matiereId, Long enseignantId);

    long countByRecuFalse();

    long countByValideFalse();



    //statistique pour differents departmements

    Optional<List<Matiere>> findMatiereByDepartementAndSpecialiteAndNiveau( DepartementEnum departement,
                                                                            SpecialiteEnum specialite,
                                                                            NiveauEnum niveau);

    Optional<List<Matiere>> findMatiereByDepartementAndSpecialiteAndNiveauAndRecuFalse( DepartementEnum departement,
                                                                            SpecialiteEnum specialite,
                                                                            NiveauEnum niveau);

    Optional<List<Matiere>> findMatiereByDepartementAndSpecialiteAndNiveauAndValideFalse( DepartementEnum departement,
                                                                                          SpecialiteEnum specialite,
                                                                                          NiveauEnum niveau);

}



