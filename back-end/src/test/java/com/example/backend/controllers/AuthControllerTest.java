package com.example.backend.controllers;

import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.LoginResponse;
import com.example.backend.models.User;
import com.example.backend.enums.Role;
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
import org.springframework.test.annotation.DirtiesContext;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
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

        // Clear any existing test data
        userRepository.deleteAll();

        // Create a test user with properly encoded password
        testUser = new User();
        testUser.setUsername("testuser");
        testUser.setPassword(passwordEncoder.encode("test1234")); // Encode the password
        testUser.setRole(Role.Chef_Dep_info);
        testUser.setFirstname("Test");
        testUser.setLastname("User");
        testUser.setMail("test@example.com");
        userRepository.save(testUser);
    }

    @Test
    public void testLogin_Success() {
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
    }


    @Test
    public void testGetUserProfile_Success() {
        // Generate token for our test user
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


}