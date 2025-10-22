package com.example.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DateGlobaleResponseDTO {
    private Long id;
    private String nom;
    private LocalDateTime date;
    private String description;
    private boolean active;
}
