package com.example.backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DateGlobaleDTO {
    private String nom;
    private LocalDateTime date;
    private String description;
    private boolean active;
}
