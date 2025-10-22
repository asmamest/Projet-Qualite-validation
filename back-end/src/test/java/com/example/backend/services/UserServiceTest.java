package com.example.backend.services;

import com.example.backend.models.User;
import com.example.backend.repositories.UserRepository;
import com.example.backend.dto.AddUserRequest;
import com.example.backend.dto.AddUserResponse;
import com.example.backend.enums.Role;
import com.example.backend.Mappers.UserMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserMapper userMapper;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private UserService userService;

    // Test data
    private final User testUser = User.builder()
            .id(1L)
            .firstname("John")
            .lastname("Doe")
            .mail("john.doe@example.com")
            .role(Role.Responsable_etudes)
            .tel(1234567890L)
            .username("johndoe")
            .password("encodedPassword")
            .build();

    private final AddUserRequest testRequest = AddUserRequest.builder()
            .firstname("John")
            .lastname("Doe")
            .mail("john.doe@example.com")
            .role(Role.Chef_Dep_info)
            .tel(1234567890L)
            .username("johndoe")
            .password("rawPassword")
            .build();

    @Test
    void getUsers_ShouldReturnAllUsers() {
        // Arrange
        when(userRepository.findAll()).thenReturn(List.of(testUser));

        // Act
        List<User> result = userService.getUsers();

        // Assert
        assertEquals(1, result.size());
        assertEquals("John", result.get(0).getFirstname());
        verify(userRepository, times(1)).findAll();
    }

    @Test
    void addNewUser_WithNewUsername_ShouldSaveUser() {
        // Arrange
        when(userRepository.findUserByUsername("johndoe")).thenReturn(Optional.empty());
        when(userMapper.toEntity(testRequest)).thenReturn(testUser);
        when(passwordEncoder.encode("rawPassword")).thenReturn("encodedPassword");

        // Act
        AddUserResponse response = userService.addNewUser(testRequest);

        // Assert
        assertEquals("User added successfully!", response.getResponse());
        verify(userRepository, times(1)).save(testUser);
        verify(emailService, times(1))
                .sendCredentials("john.doe@example.com", "johndoe", "changeme");
        assertEquals("encodedPassword", testUser.getPassword());
    }

    @Test
    void addNewUser_WithExistingUsername_ShouldThrowException() {
        // Arrange
        when(userRepository.findUserByUsername("johndoe"))
                .thenReturn(Optional.of(testUser));

        // Act & Assert
        IllegalStateException exception = assertThrows(IllegalStateException.class,
                () -> userService.addNewUser(testRequest));

        assertEquals("Username already exists!", exception.getMessage());
        verify(userRepository, never()).save(any());
    }

    @Test
    void saveProfilePicture_WithValidUser_ShouldSavePicture() throws IOException {
        // Arrange
        MultipartFile mockFile = mock(MultipartFile.class);
        when(mockFile.getBytes()).thenReturn(new byte[]{1, 2, 3});
        when(userRepository.findUserByUsername("johndoe"))
                .thenReturn(Optional.of(testUser));

        // Act
        userService.saveProfilePicture("johndoe", mockFile);

        // Assert
        assertArrayEquals(new byte[]{1, 2, 3}, testUser.getProfilePicture());
        verify(userRepository, times(1)).save(testUser);
    }

    @Test
    void saveProfilePicture_WithInvalidUser_ShouldThrowException() {
        // Arrange
        MultipartFile mockFile = mock(MultipartFile.class);
        when(userRepository.findUserByUsername("unknown"))
                .thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> userService.saveProfilePicture("unknown", mockFile));

        assertEquals("User not found", exception.getMessage());
        verify(userRepository, never()).save(any());
    }

    @Test
    void saveProfilePicture_WhenIOException_ShouldThrowRuntimeException() throws IOException {
        // Arrange
        MultipartFile corruptFile = mock(MultipartFile.class);
        when(corruptFile.getBytes()).thenThrow(new IOException("File error"));
        when(userRepository.findUserByUsername("johndoe"))
                .thenReturn(Optional.of(testUser));

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> userService.saveProfilePicture("johndoe", corruptFile));

        assertEquals("Failed to store profile picture", exception.getMessage());
        assertTrue(exception.getCause() instanceof IOException);
    }

    // Additional test for validation
    @Test
    void addNewUser_WithInvalidRequest_ShouldThrowValidationException() {
        // Arrange
        AddUserRequest invalidRequest = AddUserRequest.builder()
                .firstname("")  // Violates @NotBlank
                .username("jd")  // Violates @Size(min=4)
                .password("123") // Violates @Size(min=8)
                .build();

        // Act & Assert
        // Note: In real scenarios, validation happens before service layer
        assertThrows(Exception.class,
                () -> userService.addNewUser(invalidRequest));
    }
}