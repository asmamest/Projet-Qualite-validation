import { Component, OnInit } from '@angular/core';
import { MatiereService} from "../../Services/matiere.service";
import { EnseignantService} from "../../Services/enseignant.service";
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import {Enseignant} from '../../models/enseignant.model';
import {MatiereBackend, MatiereFrontend} from '../../models/matiere';

@Component({
  selector: 'app-matiere-list',
  standalone:false,
  templateUrl: './list-matieres.component.html',
  styleUrls: ['./list-matieres.component.css']
})

export class ListMatieresComponent implements OnInit {
  matieres: MatiereFrontend[] = [];
  enseignants: Enseignant[] = [];
  groupedMatieres: any[] = [];

  // Filtres
  filters = {
    departement: '',
    specialite: '',
    niveau: '',
    groupe: '',
    semester: '',
    typeMatiere: ''
  };

  // Options pour les selects
  departements = ['INFORMATIQUE', 'ELECTRIQUE', 'INDUS'];
  specialites = ['INFORMATIQUE', 'MECATRONIQUE', 'INDUS', 'INFOTRONIQUE'];
  niveaux = ['NIVEAU_1', 'NIVEAU_2', 'NIVEAU_3'];
  groupes = ['Groupe_A', 'Groupe_B', 'Groupe_C', 'Groupe_D', 'Groupe_E'];
  semesters=['SEMESTER1','SEMESTER2','RATTRAPAGE'];
  typeMatiere=['DS','EXAMEN','TP','PROJET'];
  // Chargement
  isLoading = true;

  constructor(
    private matiereService: MatiereService,
    private enseignantService: EnseignantService,
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
        // Conversion explicite en MatiereBackend[]
        const backendMatieres = matieres as unknown as MatiereBackend[];

        // Transformation des données
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
      recu: matiere.recu ?? false, // Initialisé à false si undefined/null
      valide: matiere.valide ?? false, // Initialisé à false si undefined/null

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


 /* groupMatieres(): void {
    this.groupedMatieres = [];

    // Création des groupes basés sur les enseignants
    this.enseignants.forEach((ens: Enseignant) => {
      if (
        (!this.filters.departement || ens.departement === this.filters.departement) &&
        (!this.filters.specialite || ens.specialite === this.filters.specialite) &&
        (!this.filters.niveau || ens.niveau === this.filters.niveau) &&
        (!this.filters.groupe || ens.groupe === this.filters.groupe) &&
        (!this.filters.semester || ens.semester === this.filters.semester) &&
        (!this.filters.typeMatiere || ens.typeMatiere === this.filters.typeMatiere)
      ) {
        const groupKey = `${ens.departement}_${ens.specialite}_${ens.niveau}_${ens.groupe}_${ens.semester}`;

        let group = this.groupedMatieres.find((g: any) =>
          g.departement === ens.departement &&
          g.specialite === ens.specialite &&
          g.niveau === ens.niveau &&
          g.groupe === ens.groupe &&
          g.semester === ens.semester &&
          g.typeMatiere === ens.typeMatiere

        );

        if (!group) {
          group = {
            departement: ens.departement,
            specialite: ens.specialite,
            niveau: ens.niveau,
            groupe: ens.groupe,
            semester: ens.semester,
            matieres: this.matieres.filter((m: MatiereFrontend) =>
              m.departement === ens.departement &&
              m.specialite === ens.specialite &&
              m.niveau === ens.niveau &&
              m.groupe === ens.groupe &&
              m.semester === ens.semester &&
              m.typeMatiere === ens.typeMatiere
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
  }*/

  groupMatieres(): void {
    this.groupedMatieres = [];

    // Création des groupes basés sur les matières (pas les enseignants)
    this.matieres.forEach((matiere: MatiereFrontend) => {
      if (
        (!this.filters.departement || matiere.departement === this.filters.departement) &&
        (!this.filters.specialite || matiere.specialite === this.filters.specialite) &&
        (!this.filters.niveau || matiere.niveau === this.filters.niveau) &&
        (!this.filters.groupe || matiere.groupe === this.filters.groupe) &&
        (!this.filters.semester || matiere.semester === this.filters.semester) &&
        (!this.filters.typeMatiere || matiere.typeMatiere === this.filters.typeMatiere)
      ) {
        const groupKey = `${matiere.departement}_${matiere.specialite}_${matiere.niveau}_${matiere.groupe}_${matiere.semester}_${matiere.typeMatiere}`;

        let group = this.groupedMatieres.find((g: any) =>
          g.departement === matiere.departement &&
          g.specialite === matiere.specialite &&
          g.niveau === matiere.niveau &&
          g.groupe === matiere.groupe &&
          g.semester === matiere.semester &&
          g.typeMatiere === matiere.typeMatiere
        );

        if (!group) {
          group = {
            departement: matiere.departement,
            specialite: matiere.specialite,
            niveau: matiere.niveau,
            groupe: matiere.groupe,
            semester: matiere.semester,
            typeMatiere: matiere.typeMatiere,
            matieres: [],
            enseignants: []
          };
          this.groupedMatieres.push(group);
        }

        // Ajouter la matière au groupe si elle n'existe pas déjà
        if (!group.matieres.some((m: MatiereFrontend) => m.id === matiere.id)) {
          group.matieres.push(matiere);
        }

        // Ajouter l'enseignant s'il n'existe pas déjà
        const enseignant = this.enseignants.find(e => e.id === matiere.enseignant.id);
        if (enseignant && !group.enseignants.some((e: Enseignant) => e.id === enseignant.id)) {
          group.enseignants.push(enseignant);
        }
      }
    });
  }


  getEnseignantsForGroup(departement: string, specialite: string, niveau: string, groupe: string, semester:string, typeMatiere:string): any[] {
    return this.enseignants.filter(ens =>
      ens.departement === departement &&
      ens.specialite === specialite &&
      ens.niveau === niveau &&
      ens.groupe === groupe &&
      ens.semester === semester &&
      ens.typeMatiere === typeMatiere
    );
  }
  /*getMatieresForEnseignant(matieres: MatiereFrontend[], enseignantId: number): MatiereFrontend[] {
    const result = matieres.filter(m => m.enseignant.id === enseignantId);
    console.log(`Matières pour enseignant ${enseignantId}:`, result); // Debug
    return result;
  }*/
  getMatieresForEnseignant(matieres: MatiereFrontend[], enseignantId: number): MatiereFrontend[] {
    return matieres.filter((m: MatiereFrontend) => m.enseignant.id === enseignantId);
  }


  // Ajoutez cette méthode pour récupérer les matières par enseignant
  getMatieresByEnseignant(matieres: any[], enseignantId: number): any[] {
    return matieres.filter(m => m.enseignant && m.enseignant.id === enseignantId);
  }


  navigateToAddMatiere(): void {
    this.router.navigate(['/add-matiere']);
  }

// Initialisation garantissant false par défaut
  getMatiereStatus(matieres: MatiereFrontend[], enseignantId: number): { recu: boolean, valide: boolean } {
    const matiere = matieres.find(m => m.enseignant.id === enseignantId);
    return {
      recu: matiere?.recu ?? false,
      valide: matiere?.valide ?? false
    };
  }

// Méthode de basculement
  toggleStatus(type: 'recu'|'valide', matieres: MatiereFrontend[], enseignantId: number): void {
    const matiere = matieres.find(m => m.enseignant.id === enseignantId);

    if (!matiere || (type === 'valide' && !matiere.recu)) return;

    matiere[type] = !matiere[type];

    // Si on désactive "Recu", on désactive aussi "Validé"
    if (type === 'recu' && !matiere.recu) {
      matiere.valide = false;
    }

    this.matiereService.updateMatiereStatus(matiere.id, matiere.recu, matiere.valide).subscribe({
      next: () => console.log('Statut mis à jour'),
      error: (err) => console.error('Erreur', err)
    });
  }
  updateRecuStatus(event: any, matieres: MatiereFrontend[], enseignantId: number): void {
    const isChecked = event.target.checked;
    const matiere = matieres.find(m => m.enseignant.id === enseignantId);

    if (matiere) {
      matiere.recu = isChecked;
      // Si on décoche "Recu", on décoche aussi "Valide"
      if (!isChecked) {
        matiere.valide = false;
      }
      this.matiereService.updateMatiereStatus(matiere.id, isChecked, matiere.valide).subscribe({
        next: () => {
          console.log('Statut Reçu mis à jour avec succès');
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du statut Reçu', err);
        }
      });
    }
  }

  updateValideStatus(event: any, matieres: MatiereFrontend[], enseignantId: number): void {
    const isChecked = event.target.checked;
    const matiere = matieres.find(m => m.enseignant.id === enseignantId);

    if (matiere) {
      matiere.valide = isChecked;
      this.matiereService.updateMatiereStatus(matiere.id, matiere.recu, isChecked).subscribe({
        next: () => {
          console.log('Statut Validé mis à jour avec succès');
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du statut Validé', err);
        }
      });
    }
  }
}
