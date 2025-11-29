package com.example.backend;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;

public class SecurityTest {

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Test
    public void testLesMotsDePasseSontChiffres() {
        // 1. Donnée : Le mot de passe brut
        String rawPassword = "MonSuperMotDePasse123";

        // 2. Action : On le chiffre
        String encodedPassword = passwordEncoder.encode(rawPassword);

        // 3. Vérifications
        // Le mot de passe chiffré ne doit pas être lisible
        assertNotEquals(rawPassword, encodedPassword, "Erreur : Le mot de passe est stocké en clair !");
        
        // Le format doit correspondre à BCrypt (commence par $2a$)
        assertTrue(encodedPassword.startsWith("$2a$"), "Erreur : L'algorithme n'est pas BCrypt");

        // L'outil doit reconnaître le bon mot de passe
        assertTrue(passwordEncoder.matches(rawPassword, encodedPassword), "Erreur : La validation du mot de passe a échoué");
    }
}