package com.example.backend.services;

import com.example.backend.models.EmailLog;
import com.example.backend.repositories.EmailLogRepository;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class EmailService {

    private final JavaMailSender mailSender;
    private final EmailLogRepository emailLogRepository; // 🆕

    public EmailService(JavaMailSender mailSender ,  EmailLogRepository emailLogRepository) {
        this.mailSender = mailSender;
        this.emailLogRepository = emailLogRepository;

    }

    public void sendCredentials(String toEmail, String username, String rawPassword) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();


        message.setTo(toEmail);
        message.setSubject("Coordonnées de votre compte ENICarthage");
        message.setText(
                "Votre compte est crée avec succée.\n\n" +
                        "Nom d'utilisateur: " + username + "\n" +
                        "Mot de passe: " + rawPassword + "\n\n"

        );

        mailSender.send(message);
            // Sauvegarder dans EmailLog
            EmailLog log = new EmailLog();
            log.setToEmail(toEmail);
            log.setSubject(message.getSubject());
            log.setContent(message.getText());
            log.setDateSent(LocalDateTime.now());
            emailLogRepository.save(log);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    public void sendNotificationToTeacher(String toEmail, String teacherName) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("Notification ENICarthage - Matières Assignées");
            message.setText(
                    "Bonjour, " + teacherName + ",\n\n" +
                            "Veuillez retourner les feuilles d'examens.\n\n" +
                            "ENICarthage Administration"
            );
            mailSender.send(message);

            // Sauvegarder dans EmailLog
            EmailLog log = new EmailLog();
            log.setToEmail(toEmail);
            log.setSubject(message.getSubject());
            log.setContent(message.getText());
            log.setDateSent(LocalDateTime.now());
            emailLogRepository.save(log);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
