package com.example.backend.controllers;

import com.example.backend.models.EmailLog;
import com.example.backend.repositories.EmailLogRepository;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/email-logs")
public class EmailLogController {

    private final EmailLogRepository emailLogRepository;

    public EmailLogController(EmailLogRepository emailLogRepository) {
        this.emailLogRepository = emailLogRepository;
    }

    @GetMapping
    public List<EmailLog> getAllEmailLogs() {
        return emailLogRepository.findAll(Sort.by(Sort.Direction.DESC, "dateSent"));
    }
}
