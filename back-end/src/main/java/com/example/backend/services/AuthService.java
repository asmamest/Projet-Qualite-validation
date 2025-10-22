package com.example.backend.services;

import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.LoginResponse;
import com.example.backend.models.User;
import com.example.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;


    @Autowired
    public AuthService(UserRepository userRepository,JwtService jwtService, PasswordEncoder passwordEncoder)

    {   this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;

    }

    public LoginResponse login(LoginRequest loginRequest) {

        User user = userRepository.findUserByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
       /* if (!user.getPassword().equals(loginRequest.getPassword())) {
            throw new RuntimeException("Wrong password");
        }*/
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Wrong password");
        }

        String token = jwtService.generateToken(user);
        return new LoginResponse(user.getUsername(), user.getRole(),token);
    }
}
