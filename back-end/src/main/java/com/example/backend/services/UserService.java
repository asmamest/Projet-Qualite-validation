package com.example.backend.services;

import com.example.backend.Mappers.UserMapper;
import com.example.backend.dto.AddUserRequest;

import com.example.backend.dto.AddUserResponse;
import com.example.backend.models.User;
import com.example.backend.repositories.UserRepository;
import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;// Injected mapper
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Autowired
    public UserService(UserRepository userRepository, UserMapper userMapper, PasswordEncoder passwordEncoder,EmailService emailService) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;

    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Transactional
    public AddUserResponse addNewUser(@Valid AddUserRequest request) {
        Optional<User> userOptional = userRepository.findUserByUsername(request.getUsername());

        if (userOptional.isPresent()) {
            throw new IllegalStateException("Username already exists!");
        }

        // Convert DTO to Entity using MapStruct
        User user = userMapper.toEntity(request);

        user.setPassword(passwordEncoder.encode(request.getPassword()));


        emailService.sendCredentials(
                user.getMail(),
                user.getUsername(),
                request.getPassword() // Send the initial password
        );
        userRepository.save(user);

        return new AddUserResponse("User added successfully!");
    }



    public void saveProfilePicture(String username, MultipartFile file) {
        User user = userRepository.findUserByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        try {
            user.setProfilePicture(file.getBytes());
            userRepository.save(user);
        } catch (IOException e) {
            throw new RuntimeException("Failed to store profile picture", e);
        }
    }

}
