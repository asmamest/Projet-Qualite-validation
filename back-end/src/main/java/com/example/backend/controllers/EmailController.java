package com.example.backend.controllers;

import com.example.backend.services.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/email")
public class EmailController {

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/send-to-teacher")
    public ResponseEntity<Map<String, String>> sendEmailToTeacher(@RequestBody EmailRequest request) {
        try {
            emailService.sendNotificationToTeacher(request.getEmail(), request.getTeacherName());
            return ResponseEntity.ok().body(Map.of("message", "Email sent successfully"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Failed to send email: " + e.getMessage()));
        }
    }

    // Déplacez la classe EmailRequest en dehors de la classe EmailController
    public static class EmailRequest {
        private String email;
        private String teacherName;

        // Getters et setters obligatoires
        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getTeacherName() {
            return teacherName;
        }

        public void setTeacherName(String teacherName) {
            this.teacherName = teacherName;
        }
    }
}
