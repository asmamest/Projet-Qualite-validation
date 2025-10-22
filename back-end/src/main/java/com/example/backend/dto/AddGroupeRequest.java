package com.example.backend.dto;
import com.example.backend.enums.Departement;
import com.example.backend.enums.Level;
import com.example.backend.enums.Speciality;
import lombok.*;
import jakarta.validation.constraints.*;

@Value
@Builder
public class AddGroupeRequest
{
    @NotBlank
    String name;

    @NotNull
    Speciality speciality;

    @NotNull
    Departement departement;

    @NotNull
    Level level;
}
