import { Component, OnInit } from '@angular/core';
import { MatiereService } from "../../Services/matiere.service";
import { EnseignantService } from "../../Services/enseignant.service";
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Enseignant } from '../../models/enseignant.model';
import { MatiereBackend, MatiereFrontend } from '../../models/matiere';
import { EmailService } from '../../Services/email-service.service';

@Component({
  selector: 'app-matiere-list-with-mail',
  standalone:false,
  templateUrl: 'list-matieres-component-with-mail.component.html',
  styleUrls: ['list-matieres-component-with-mail.component.scss']
})
export class ListMatieresComponentWithMail implements OnInit {
  matieres: MatiereFrontend[] = [];
  enseignants: Enseignant[] = [];
  groupedMatieres: any[] = [];

  // Filtres
  filters = {
    departement: '',
    specialite: '',
    niveau: '',
    groupe: ''
  };

  // Options pour les selects
  departements = ['INFORMATIQUE', 'ELECTRIQUE', 'INDUS'];
  specialites = ['INFORMATIQUE', 'MECATRONIQUE', 'INDUS', 'INFOTRONIQUE'];
  niveaux = ['NIVEAU_1', 'NIVEAU_2', 'NIVEAU_3'];
  groupes = ['Groupe_A', 'Groupe_B', 'Groupe_C', 'Groupe_D', 'Groupe_E'];

  // Chargement
  isLoading = true;

  constructor(
    private matiereService: MatiereService,
    private enseignantService: EnseignantService,
    private emailService: EmailService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;

    forkJoin([
      this.matiereService.getAllMatieres(),
      this.enseignantService.getAllEnseignants()
    ]).subscribe({
      next: ([matieres, enseignants]) => {
        const backendMatieres = matieres as unknown as MatiereBackend[];
        this.matieres = backendMatieres.map(m => this.transformMatiere(m));
        this.enseignants = enseignants as Enseignant[];
        this.groupMatieres();
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  private transformMatiere(matiere: MatiereBackend): MatiereFrontend {
    return {
      id: matiere.id,
      nomMatiere: matiere.nomMatiere,
      departement: matiere.departement,
      specialite: matiere.specialite,
      niveau: matiere.niveau,
      groupe: matiere.groupe,
      semester: matiere.semester,
      typeMatiere: matiere.typeMatiere,
      recu: matiere.recu ?? false,
      valide: matiere.valide ?? false,
      enseignant: {
        id: matiere.enseignantId,
        nom: matiere.enseignantNom,
        email: matiere.enseignantEmail
      }
    };
  }

  onFilterChange(): void {
    this.groupMatieres();
  }

  groupMatieres(): void {
    this.groupedMatieres = [];

    this.enseignants.forEach((ens: Enseignant) => {
      if (
        (!this.filters.departement || ens.departement === this.filters.departement) &&
        (!this.filters.specialite || ens.specialite === this.filters.specialite) &&
        (!this.filters.niveau || ens.niveau === this.filters.niveau) &&
        (!this.filters.groupe || ens.groupe === this.filters.groupe)
      ) {
        const groupKey = `${ens.departement}_${ens.specialite}_${ens.niveau}_${ens.groupe}`;

        let group = this.groupedMatieres.find((g: any) =>
          g.departement === ens.departement &&
          g.specialite === ens.specialite &&
          g.niveau === ens.niveau &&
          g.groupe === ens.groupe
        );

        if (!group) {
          group = {
            departement: ens.departement,
            specialite: ens.specialite,
            niveau: ens.niveau,
            groupe: ens.groupe,
            matieres: this.matieres.filter((m: MatiereFrontend) =>
              m.departement === ens.departement &&
              m.specialite === ens.specialite &&
              m.niveau === ens.niveau &&
              m.groupe === ens.groupe
            ),
            enseignants: []
          };
          this.groupedMatieres.push(group);
        }

        if (!group.enseignants.some((e: Enseignant) => e.id === ens.id)) {
          group.enseignants.push(ens);
        }
      }
    });
  }

  getMatieresForEnseignant(matieres: MatiereFrontend[], enseignantId: number): MatiereFrontend[] {
    return matieres.filter((m: MatiereFrontend) => m.enseignant.id === enseignantId);
  }

  navigateToAddMatiere(): void {
    this.router.navigate(['/add-matiere']);
  }

  sendEmailToTeacher(email: string, teacherName: string): void {
    this.emailService.sendEmail(email, teacherName).subscribe({
      next: (response) => {
        console.log('Email envoyé avec succès', response);
        alert(`Email envoyé à ${teacherName} (${email})`);
      },
      error: (err) => {
        console.error('Erreur complète:', err);
        if (err.error && err.error.error) {
          alert('Erreur: ' + err.error.error);
        } else {
          alert('Erreur lors de l\'envoi de l\'email');
        }
      }
    });
  }
}
