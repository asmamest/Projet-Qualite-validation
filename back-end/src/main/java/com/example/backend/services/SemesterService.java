package com.example.backend.services;

import com.example.backend.models.Semester;
import com.example.backend.repositories.SemesterRepository;

import java.util.List;

public class SemesterService {
    private final SemesterRepository semesterRepository;

    public SemesterService(SemesterRepository semesterRepository) {
        this.semesterRepository = semesterRepository;
    }

    public List<Semester> getAllSemesters () {
        return semesterRepository.findAll();
    }

    public Semester addSemester(Semester semester) {
        return semesterRepository.save(semester);
    }
}
