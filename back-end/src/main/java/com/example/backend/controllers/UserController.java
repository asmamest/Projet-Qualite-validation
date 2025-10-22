package com.example.backend.controllers;

import com.example.backend.dto.AddUserRequest;
import com.example.backend.dto.AddUserResponse;
import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.LoginResponse;
import com.example.backend.models.User;
import com.example.backend.repositories.UserRepository;
import com.example.backend.services.JwtService;
import com.example.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path="/api/user")

public class UserController {

    private final UserService userService;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    @Autowired
    public UserController(UserService userService, JwtService jwtService, UserRepository userRepository) {
        this.userService = userService ;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getUsers();
    }


    @PostMapping
    public ResponseEntity<AddUserResponse>
    login(@RequestBody AddUserRequest request)
    {
        AddUserResponse response = userService.addNewUser(request);
        return ResponseEntity.ok(response);
    }
  //profile picture

    @PostMapping("/profile-picture")
    public ResponseEntity<Map<String, String>> uploadProfilePicture(
            @RequestParam("file") MultipartFile file,
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.replace("Bearer ", "");
        String username = jwtService.extractUsername(token); // use your JWT utility to decode

        userService.saveProfilePicture(username, file);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Uploaded!");

        return ResponseEntity.ok(response);
    }

    @GetMapping("/profile-picture")
    public ResponseEntity<byte[]> getProfilePicture(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String username = jwtService.extractUsername(token);

        User user = userRepository.findUserByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        byte[] image = user.getProfilePicture();

        return ResponseEntity
                .ok()
                .header("Content-Type", "image/jpeg") // or "image/png" based on what you support
                .body(image);
    }


}
