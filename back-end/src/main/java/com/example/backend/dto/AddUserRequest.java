package com.example.backend.dto;


import com.example.backend.enums.Role;
import com.example.backend.models.User;
import jakarta.validation.constraints.*;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;

@Data
@Getter
@Setter// Generates getters, setters, toString, equals, hashCode
@NoArgsConstructor // For Jackson deserialization
@AllArgsConstructor // For easy construction
@Builder
// For object creation with builder pattern
public class AddUserRequest {

    @NotBlank(message = "First name is required")
    private String firstname;

    @NotBlank(message = "Last name is required")
    private String lastname;

    @Email(message = "Invalid email format")
    @NotBlank
    private String mail;


    private Role role;

    @Digits(integer = 15, fraction = 0, message = "Invalid phone number format")
    private Long tel;

    @NotBlank
    @Size(min = 4, max = 20, message = "Username must be 4-20 characters")
    private String username;

    @NotBlank
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;


}