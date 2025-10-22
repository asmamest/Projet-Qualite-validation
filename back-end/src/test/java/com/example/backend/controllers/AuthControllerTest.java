package com.example.backend.controllers;

import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.LoginResponse;
import com.example.backend.enums.Role;
import com.example.backend.models.User;
import com.example.backend.repositories.UserRepository;
import com.example.backend.services.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Transactional
public class AuthControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private String baseUrl;
    private User testUser;

    @BeforeEach
    public void setUp() {
        baseUrl = "http://localhost:" + port + "/api/auth";
        userRepository.deleteAll(); // Nettoyage de la base

        // Création de l'utilisateur de test
        testUser = createTestUser("testuser", "test1234");
    }

    /** Méthode utilitaire pour créer un utilisateur avec mot de passe encodé */
    private User createTestUser(String username, String rawPassword) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(rawPassword));
        user.setRole(Role.Chef_Dep_info);
        user.setFirstname("Test");
        user.setLastname("User");
        user.setMail(username + "@example.com");
        return userRepository.save(user);
    }

    // -------------------- TESTS POSITIFS --------------------

    @Test
    void testLogin_Success() {
        LoginRequest request = new LoginRequest("testuser", "test1234");

        ResponseEntity<LoginResponse> response = restTemplate.postForEntity(
                baseUrl + "/login",
                request,
                LoginResponse.class
        );

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("testuser", response.getBody().getUsername());
        assertNotNull(response.getBody().getToken());
        assertTrue(jwtService.isTokenValid(response.getBody().getToken(), testUser));
    }

    @Test
    void testGetUserProfile_Success() {
        String token = jwtService.generateToken(testUser);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);

        ResponseEntity<User> response = restTemplate.exchange(
                baseUrl + "/me",
                HttpMethod.GET,
                new HttpEntity<>(headers),
                User.class
        );

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("testuser", response.getBody().getUsername());
        assertEquals(Role.Chef_Dep_info, response.getBody().getRole());
    }

    // -------------------- TESTS NÉGATIFS --------------------

    @Test
    void testLogin_Failure_WrongPassword() {
        LoginRequest request = new LoginRequest("testuser", "wrongpass");

        ResponseEntity<String> response = restTemplate.postForEntity(
                baseUrl + "/login",
                request,
                String.class
        );

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    }

    @Test
    void testLogin_Failure_UserNotFound() {
        LoginRequest request = new LoginRequest("unknownuser", "test1234");

        ResponseEntity<String> response = restTemplate.postForEntity(
                baseUrl + "/login",
                request,
                String.class
        );

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    }

    @Test
    void testGetUserProfile_Unauthorized_NoToken() {
        ResponseEntity<String> response = restTemplate.exchange(
                baseUrl + "/me",
                HttpMethod.GET,
                HttpEntity.EMPTY,
                String.class
        );

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    }

    @Test
    void testGetUserProfile_Unauthorized_InvalidToken() {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth("invalid.token.here");

        ResponseEntity<String> response = restTemplate.exchange(
                baseUrl + "/me",
                HttpMethod.GET,
                new HttpEntity<>(headers),
                String.class
        );

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    }

}
