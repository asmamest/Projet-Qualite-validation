/*package com.example.backend.services;


import com.example.backend.dto.request.EnseignantDTO;
import com.example.backend.dto.response.EnseignantResponseDTO;
import com.example.backend.mapper.EnseignantMapper;
import com.example.backend.models.Enseignant;
import com.example.backend.models.Matiere;
import com.example.backend.repositories.EnseignantRepository;
import com.example.backend.repositories.MatiereRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
@Transactional
@Service
@RequiredArgsConstructor
public class EnseignantService {
    private final EnseignantRepository enseignantRepository;
    private final MatiereRepository matiereRepository;
    private final EnseignantMapper mapper;
    private final EnseignantMapper enseignantMapper;

    @Transactional
    public EnseignantResponseDTO createEnseignant(EnseignantDTO dto) {

        Enseignant enseignant = new Enseignant();
        enseignant.setNom(dto.getNom());
        enseignant.setEmail(dto.getEmail());
        enseignant.setMatieres(dto.getMatiereNoms());
        enseignant.setGroupe(dto.getGroupe());
        enseignant.setNiveau(dto.getNiveau());
        enseignant.setSpecialite(dto.getSpecialite());
        enseignant.setDepartement(dto.getDepartement());

        Enseignant saved = enseignantRepository.save(enseignant);

        return enseignantMapper.toResponseDTO(saved);
    }



    // DELETE
    public void deleteEnseignant(Long id) {
        if (!enseignantRepository.existsById(id)) {
            throw new EntityNotFoundException("Enseignant non trouvé avec l'ID : " + id);
        }
        enseignantRepository.deleteById(id);
    }




    // GET ALL
    public List<EnseignantResponseDTO> getAllEnseignants() {
        return enseignantRepository.findAll().stream()
                .map(enseignantMapper::toResponseDTO)
                .collect(Collectors.toList());
    }






    public EnseignantResponspository.findById(id)
                .map(enseignantMapper::toResponseDTO) // Convertit Enseignant -> EnseignantResponseDTO
                .orElseThrow(eDTO getEnseignantById(Long id) {
        return enseignantRe() -> new EntityNotFoundException("Enseignant non trouvé"));
    }
}


 */

package com.example.backend.services;

import com.example.backend.dto.request.EnseignantDTO;
import com.example.backend.dto.response.EnseignantResponseDTO;
import com.example.backend.enumeration.*;
import com.example.backend.mapper.EnseignantMapper;
import com.example.backend.models.Enseignant;
import com.example.backend.models.Matiere;
import com.example.backend.repositories.EnseignantRepository;
import com.example.backend.repositories.MatiereRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class EnseignantService {
    private final EnseignantRepository enseignantRepository;
    private final MatiereRepository matiereRepository;
    private final EnseignantMapper enseignantMapper;

    // Modifier le constructeur pour inclure MatiereRepository
    public EnseignantService(
            EnseignantRepository enseignantRepository,
            MatiereRepository matiereRepository, // Ajouter ce paramètre
            EnseignantMapper enseignantMapper) {
        this.enseignantRepository = enseignantRepository;
        this.matiereRepository = matiereRepository; // Initialiser la variable
        this.enseignantMapper = enseignantMapper;
    }

    public EnseignantResponseDTO saveEnseignant(EnseignantDTO enseignantDTO) {
        Enseignant enseignant = enseignantMapper.toEntity(enseignantDTO);
        Enseignant savedEnseignant = enseignantRepository.save(enseignant);
        return enseignantMapper.toResponseDTO(savedEnseignant);
    }

    public List<EnseignantResponseDTO> getEnseignantsByFilters(
            DepartementEnum departement,
            SpecialiteEnum specialite,
            NiveauEnum niveau,
            GroupeEnum groupe,
            SemesterEnum semester) {

        List<Enseignant> enseignants = enseignantRepository.findByDepartementAndSpecialiteAndNiveauAndGroupeAndSemester(
                departement, specialite, niveau, groupe,semester);

        return enseignants.stream()
                .map(enseignantMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    public List<EnseignantResponseDTO> getAllEnseignants() {
        return enseignantRepository.findAll().stream()
                .map(enseignantMapper::toResponseDTO)
                .collect(Collectors.toList());
    }



    @Transactional
    public void deleteEnseignant(Long id) {
        if (!enseignantRepository.existsById(id)) {
            throw new jakarta.persistence.EntityNotFoundException("Enseignant not found with id: " + id);
        }
        matiereRepository.deleteByEnseignant_Id(id); // Utiliser matiereRepository
        enseignantRepository.deleteById(id);
    }

    public void deleteAllEnseignants() {
        List<Enseignant> enseignants = enseignantRepository.findAll();

        if (enseignants.isEmpty()) {
            throw new jakarta.persistence.EntityNotFoundException("No enseignants found to delete.");
        }
        matiereRepository.deleteAll();
        enseignantRepository.deleteAll();
    }


    //statistiques pour differnet departments

    public Integer enseignant_stat(DepartementEnum dep, SpecialiteEnum spec) {
        Optional<List<Enseignant>> enseignantsOpt = enseignantRepository.findByDepartementAndSpecialite(dep, spec);
        Set<Long> enseignantsWithMissingReturn = new HashSet<>();

        if (enseignantsOpt.isPresent()) {
            List<Enseignant> enseignants = enseignantsOpt.get();
            for (Enseignant enseignant : enseignants) {
                List<Matiere> matieres = matiereRepository.findByEnseignantId(enseignant.getId());

                boolean hasUnreturned = matieres.stream()
                        .anyMatch(m -> Boolean.FALSE.equals(m.getRecu())); // null-safe

                if (hasUnreturned) {
                    enseignantsWithMissingReturn.add(enseignant.getId());
                }
            }
        }

        return enseignantsWithMissingReturn.size();
    }

}
