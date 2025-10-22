package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Value
@AllArgsConstructor
@Builder
@ToString
@EqualsAndHashCode
@Setter

public class AddGroupeResponse {

    @NotBlank
    private String response;

}
