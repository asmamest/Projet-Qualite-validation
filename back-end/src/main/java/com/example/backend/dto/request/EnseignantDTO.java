package com.example.backend.dto.request;

import com.example.backend.enumeration.*;
import lombok.Data;

@Data
public class EnseignantDTO {
    private String nom;
    private String email;
    private DepartementEnum departement;
    private SpecialiteEnum specialite;
    private NiveauEnum niveau;
    private GroupeEnum groupe;
    private SemesterEnum semester;
}
