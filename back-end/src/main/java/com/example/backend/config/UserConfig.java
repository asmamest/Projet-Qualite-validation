package com.example.backend.config;

import com.example.backend.enums.Role;
import com.example.backend.models.User;
import com.example.backend.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/*@Configuration
public class UserConfig {

    @Bean
    CommandLineRunner commandLineRunner(UserRepository userRepository) {
        return args -> {
            User user1 = new User("mohamed","ben ali","medbenali@gmail.com", Role.Chef_Dep_electrique,55555555L,"med1","med123");
            User user2 = new User("fatma","ben salah","fatmabensalah@gmail.com",Role.Chef_Dep_info,66666666L,"fatm1","fatm123");

        userRepository.saveAll(List.of(user1,user2));
        };
    }
}*/
