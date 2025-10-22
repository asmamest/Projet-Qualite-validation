/*package com.example.backend.Mappers;

import com.example.backend.dto.AddGroupeRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(
        componentModel = "spring"
)
public interface GroupeMapper {

    GroupeMapper INSTANCE = Mappers.getMapper(GroupeMapper.class);

    @Mapping(target = "id", ignore = true) // Ignore ID as it's auto-generated
    @Mapping(source = "name", target = "name")
    @Mapping(source = "speciality", target = "speciality")
    @Mapping(source = "departement", target = "departement")
    @Mapping(source = "level", target = "level")
    Groupe toEntity(AddGroupeRequest dto);

    @Mapping(source = "name", target = "name")
    @Mapping(source = "speciality", target = "speciality")
    @Mapping(source = "departement", target = "departement")
    @Mapping(source = "level", target = "level")
    AddGroupeRequest toDto(Groupe entity);

}*/
