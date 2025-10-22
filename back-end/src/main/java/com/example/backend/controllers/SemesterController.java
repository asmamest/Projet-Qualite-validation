package com.example.backend.controllers;

import com.example.backend.models.Niveau;
import com.example.backend.models.Semester;
import com.example.backend.services.NiveauService;
import com.example.backend.services.SemesterService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public class SemesterController {
    private final SemesterService semesterService;

    public SemesterController(SemesterService semesterService) {
        this.semesterService = semesterService;
    }

    @GetMapping
    public List<Semester> getAllSemesters() {
        return semesterService.getAllSemesters();
    }

    @PostMapping
    public Semester addSemester(@RequestBody Semester semester) {
        return semesterService.addSemester(semester);
    }
}

