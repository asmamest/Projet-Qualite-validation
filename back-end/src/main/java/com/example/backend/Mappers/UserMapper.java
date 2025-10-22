package com.example.backend.Mappers;

import com.example.backend.dto.AddUserRequest;
import com.example.backend.models.User;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

@Mapper(
        componentModel = "spring"
)
public interface UserMapper {


    @Mapping(target = "id", ignore = true) // Ignore ID as it's auto-generated
    @Mapping(source = "firstname", target = "firstname")
    @Mapping(source = "lastname", target = "lastname")
    @Mapping(source = "mail", target = "mail")
    @Mapping(source = "role", target = "role")
    @Mapping(source = "tel", target = "tel")
    @Mapping(source = "username", target = "username")
    @Mapping(target = "password",ignore = true)
    User toEntity(AddUserRequest dto);


    @Mapping(source = "firstname", target = "firstname")
    @Mapping(source = "lastname", target = "lastname")
    @Mapping(source = "mail", target = "mail")
    @Mapping(source = "role", target = "role")
    @Mapping(source = "tel", target = "tel")
    @Mapping(source = "username", target = "username")
    @Mapping(source = "password", target = "password")
    AddUserRequest toDto(User entity);
}