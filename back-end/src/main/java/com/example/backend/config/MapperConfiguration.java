package com.example.backend.config;

import com.example.backend.mapper.EnseignantMapper;
import org.mapstruct.factory.Mappers;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MapperConfiguration {

    @Bean
    public EnseignantMapper enseignantMapper() {
        return Mappers.getMapper(EnseignantMapper.class);
    }
}
