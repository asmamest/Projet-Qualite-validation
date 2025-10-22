package com.example.backend.dto.request;

import lombok.Data;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
public class MatiereDTO {
    private String nomMatiere;
    private String departement;
    private String specialite;
    private String niveau;
    private String groupe;
    private String semester;
    private String typeMatiere;
    private Long enseignantId;
    private Boolean recu ;
    private Boolean valide ;
    private LocalDateTime updatedAt;
}
