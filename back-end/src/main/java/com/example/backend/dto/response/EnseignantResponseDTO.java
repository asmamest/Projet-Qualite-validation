package com.example.backend.dto.response;

import com.example.backend.enumeration.*;
import lombok.Data;

import java.util.List;

@Data
public class EnseignantResponseDTO {
    private Long id;
    private String nom;
    private String email;
    private DepartementEnum departement;
    private SpecialiteEnum specialite;
    private NiveauEnum niveau;
    private GroupeEnum groupe;
    private SemesterEnum semester;
  //  private List<String> matieres; // Doit être rempli

}
