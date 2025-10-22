package com.example.backend.models;

import com.example.backend.enums.Role;
import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
@Entity
@Table
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //@Transient in case  don't want the firstName to be saved in the DB
    private String firstname;
    private String lastname;
    private String mail;

    @Enumerated(EnumType.STRING)
    @Builder.Default // Initialize with default role
    private Role role=Role.Responsable_etudes;

    private Long tel ;
    @Column(unique = true)
    private String username;
    private String password;

    @Lob
    private byte[] profilePicture;

    public User(String firstname, String lastname, String mail, Role role, Long tel, String username, String password) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.mail = mail;
        this.role = role;
        this.tel = tel;
        this.username = username;
        this.password = password;
    }

}
