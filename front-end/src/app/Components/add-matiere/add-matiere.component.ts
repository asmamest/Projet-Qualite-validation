import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatiereService} from "../../Services/matiere.service";
import { EnseignantService} from "../../Services/enseignant.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-matiere',
  standalone:false,
  templateUrl: './add-matiere.component.html',
  styleUrls: ['./add-matiere.component.css']
})
export class AddMatiereComponent implements OnInit {
  matiereForm: FormGroup;
  enseignants: any[] = [];
  filteredEnseignants: any[] = [];

  // Listes pour les selects
  departements = ['INFORMATIQUE', 'ELECTRIQUE', 'INDUS'];
  specialites = ['INFORMATIQUE', 'MECATRONIQUE', 'INDUS', 'INFOTRONIQUE'];
  niveaux = ['NIVEAU_1', 'NIVEAU_2', 'NIVEAU_3'];
  groupes = ['Groupe_A', 'Groupe_B', 'Groupe_C', 'Groupe_D', 'Groupe_E'];
  semesters=['SEMESTER1','SEMESTER2','RATTRAPAGE'];
  typeMatiere=['DS','EXAMEN','TP','PROJET'];

  // Notification
  showNotification = false;
  notificationMessage = '';
  isSuccess = false;

  constructor(
    private fb: FormBuilder,
    private matiereService: MatiereService,
    private enseignantService: EnseignantService,
    private router: Router
  ) {
    this.matiereForm = this.fb.group({
      nomMatiere: ['', Validators.required],
      departement: ['', Validators.required],
      specialite: ['', Validators.required],
      niveau: ['', Validators.required],
      groupe: ['', Validators.required],
      semester:['',Validators.required],
      typeMatiere:['',Validators.required],
      enseignantId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEnseignants();

    // Filtrer les enseignants quand les critères changent
    this.matiereForm.valueChanges.subscribe(() => {
      this.filterEnseignants();
    });
  }

  loadEnseignants(): void {
    this.enseignantService.getAllEnseignants().subscribe({
      next: (data) => {
        this.enseignants = data;
        this.filterEnseignants();
      },
      error: (err) => console.error(err)
    });
  }

  filterEnseignants(): void {
    const { departement, specialite, niveau, groupe , semester  } = this.matiereForm.value;

    if (departement && specialite && niveau && groupe && semester ) {
      this.filteredEnseignants = this.enseignants.filter(ens =>
        ens.departement === departement &&
        ens.specialite === specialite &&
        ens.niveau === niveau &&
        ens.groupe === groupe &&
        ens.semester === semester
        //ens.TypeMatiere === TypeMatiere
      );
    } else {
      this.filteredEnseignants = [];
    }
  }

  onSubmit(): void {
    if (this.matiereForm.valid) {

      this.matiereService.saveMatiere(this.matiereForm.value).subscribe({
        next: () => {
          this.showNotification = true;
          this.isSuccess = true;
          this.notificationMessage = 'La nouvelle matière a été ajoutée avec succès à la Matrice.';

          setTimeout(() => {
            this.showNotification = false;
            this.router.navigate(['/matieres']);
          }, 3000);
        },
        error: (err) => {
          this.showNotification = true;
          this.isSuccess = false;
          this.notificationMessage = err.error?.message || 'Une erreur est survenue lors de l\'ajout de la matière.';

          setTimeout(() => {
            this.showNotification = false;
          }, 3000);
        }
      });
    }
  }
}
