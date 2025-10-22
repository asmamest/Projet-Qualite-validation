package com.example.backend.services;
import com.example.backend.dto.response.StatistiqueDTO;
import com.example.backend.enumeration.*;
import com.example.backend.models.DateGlobale;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import com.example.backend.dto.request.MatiereDTO;
import com.example.backend.dto.response.MatiereResponseDTO;
import com.example.backend.mapper.MatiereMapper;
import com.example.backend.models.Enseignant;
import com.example.backend.models.Matiere;
import com.example.backend.repositories.EnseignantRepository;
import com.example.backend.repositories.MatiereRepository;
import org.springframework.stereotype.Service;
import com.example.backend.repositories.DateGlobaleRepository;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
@Service
public class MatiereService {
    private final MatiereRepository matiereRepository;
    private final EnseignantRepository enseignantRepository;
    private final MatiereMapper matiereMapper;
    private final DateGlobaleRepository dateGlobaleRepository;

    public MatiereService(MatiereRepository matiereRepository,
                          EnseignantRepository enseignantRepository,
                          MatiereMapper matiereMapper,
                          DateGlobaleRepository dateGlobaleRepository) {
        this.matiereRepository = matiereRepository;
        this.enseignantRepository = enseignantRepository;
        this.matiereMapper = matiereMapper;
        this.dateGlobaleRepository = dateGlobaleRepository;
    }

    public Matiere saveMatiere(MatiereDTO matiereDTO) {
        Matiere matiere = new Matiere();
        matiere.setNomMatiere(matiereDTO.getNomMatiere());
        matiere.setDepartement(DepartementEnum.valueOf(matiereDTO.getDepartement()));
        matiere.setSpecialite(SpecialiteEnum.valueOf(matiereDTO.getSpecialite()));
        matiere.setNiveau(NiveauEnum.valueOf(matiereDTO.getNiveau()));
        matiere.setGroupe(GroupeEnum.valueOf(matiereDTO.getGroupe()));
        matiere.setSemester(SemesterEnum.valueOf(matiereDTO.getSemester()));
        matiere.setTypeMatiere(TypeMatiereEnum.valueOf(matiereDTO.getTypeMatiere()));

        Enseignant enseignant = enseignantRepository.findById(matiereDTO.getEnseignantId())
                .orElseThrow(() -> new RuntimeException("Enseignant not found"));
        matiere.setEnseignant(enseignant);

        return matiereRepository.save(matiere);
    }

    public List<MatiereResponseDTO> getAllMatieres() {
        return matiereRepository.findAll().stream()
                .map(matiere -> matiereMapper.toResponseDTO(matiere))
                .collect(Collectors.toList());
    }

    public List<MatiereResponseDTO> getMatieresByEnseignant(Long enseignantId) {
        return matiereRepository.findByEnseignantId(enseignantId).stream()
                .map(matiere -> matiereMapper.toResponseDTO(matiere))
                .collect(Collectors.toList());
    }

    /// Asma Update
    ///
    public List<Map<String,Object>> getFormattedMatiereStats(){
        List<Object[]> results = matiereRepository.getMatiereValideByDepartementAndNiveau();
        List<Map<String,Object>> formattedResults = new ArrayList<>();

        for (Object[] row : results) {
            Map<String, Object> map = new HashMap<>();
            map.put("departement", row[0] != null ? row[0].toString() : "Non spécifié");
            map.put("niveau", row[1] != null ? row[1].toString() : "Non spécifié");
            map.put("total", row[2] != null ? row[2] : 0);
            formattedResults.add(map);
        }
        return formattedResults;
    }

    // Récupérer toutes les matières mises à jour récemment
    public List<Matiere> findRecentUpdates() {
        return matiereRepository.findByRecuTrueOrValideTrueOrderByUpdatedAtDesc();
    }


    public void updateMatiereStatus(Long matiereId,boolean recu,boolean valide) {
        Matiere matiere = matiereRepository.findById(matiereId).orElseThrow(() -> new RuntimeException("Matiere introuvable"));
        matiere.setRecu(recu);
        if(!recu){
            matiere.setValide(false);
        } else{
            matiere.setValide(valide);
        }

        matiereRepository.save(matiere);
    }



    public StatistiqueDTO getDashboardStats() {
        StatistiqueDTO stats = new StatistiqueDTO();

        // Nombre d'examens non soumis
        long unsubmittedCount = matiereRepository.countUnsubmittedSubjects();
        stats.setUnsubmittedExams(unsubmittedCount);

        // Nombre de notes non validées
        long unvalidatedCount = matiereRepository.countUnvalidatedSubjects();
        stats.setUnvalidatedNotes(unvalidatedCount);

        // Nombre total d'enseignants
        long totalTeachers = enseignantRepository.count();
        stats.setTotalTeachers(totalTeachers);

        // Nombre d'enseignants en retard
        long lateTeachers = countLateTeachers();
        stats.setLateTeachers(lateTeachers);

        return stats;

    }

    private long countLateTeachers() {
        // Récupérer la date limite de réception
        Optional<DateGlobale> dateReception = dateGlobaleRepository.findByNomAndActiveTrue(DateGlobale.DATE_RECEPTION);

        if (!dateReception.isPresent()) {
            return 0L; // Si pas de date limite, personne n'est en retard
        }

        LocalDateTime dateLimit = dateReception.get().getDate();

        // Compter les enseignants qui ont des matières non reçues après la date limite
        List<Enseignant> allTeachers = enseignantRepository.findAll();
        long lateCount = 0;

        for (Enseignant teacher : allTeachers) {
            List<Matiere> matieres = matiereRepository.findByEnseignantId(teacher.getId());

            // Un enseignant est en retard s'il a au moins une matière non reçue
            boolean isLate = matieres.stream()
                    .anyMatch(m -> !m.getRecu() && LocalDateTime.now().isAfter(dateLimit));

            if (isLate) {
                lateCount++;
            }
        }

        return lateCount;
    }

    public void deleteAllMatieres() {
        List<Matiere> matieres = matiereRepository.findAll();

        if (matieres.isEmpty()) {
            throw new jakarta.persistence.EntityNotFoundException("No matieres found to delete.");
        }
        matiereRepository.deleteAll();
    }


    // statistique pour differnets departements

    public List<Double> matieres_stat(DepartementEnum dep,
                                 SpecialiteEnum spec,
                                 NiveauEnum niv)
    {
            int size=0,sizeNR=0,sizeNV=0;
            double pNR=0, pNV=0;

        Optional<List<Matiere>> list =matiereRepository.findMatiereByDepartementAndSpecialiteAndNiveau(dep, spec, niv);
        if (list.isPresent()) {
            size = list.get().size();
        }

        Optional<List<Matiere>> listNR =matiereRepository.findMatiereByDepartementAndSpecialiteAndNiveauAndRecuFalse(dep, spec, niv);
        if (listNR.isPresent())
        {
            sizeNR = listNR.get().size();
        }

        Optional<List<Matiere>> listNV =matiereRepository.findMatiereByDepartementAndSpecialiteAndNiveauAndValideFalse(dep, spec, niv);
        if (listNV.isPresent())
        {
            sizeNV = listNV.get().size();
        }
         if(size!=0) {
             pNR = (double) sizeNR *100/ size;
             pNV = (double) sizeNV *100 / size;
         }
         return Arrays.asList(pNR, pNV);


    }

}
