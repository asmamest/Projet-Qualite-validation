package com.example.backend.dto;
import com.example.backend.enums.Role;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString

public class LoginResponse {
    private String username;
    private Role role;
    private String token;

}
