package com.example.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StatistiqueDTO {
    private Long unsubmittedExams;
    private Long unvalidatedNotes;
    private Long totalTeachers;
    private Long lateTeachers;
}
