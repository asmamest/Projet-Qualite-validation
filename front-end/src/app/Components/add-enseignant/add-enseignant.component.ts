import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnseignantService} from "../../Services/enseignant.service";
import { Router } from '@angular/router';

@Component({
  selector: 'add-enseignant',
  standalone:false,
  templateUrl: 'add-enseignant.component.html',
  styleUrls: ['./add-enseignant.component.css']
})
export class AddEnseignantComponent {
  enseignantForm: FormGroup;
  departements = ['INFORMATIQUE', 'ELECTRIQUE', 'INDUS'];
  specialites = ['INFORMATIQUE', 'MECATRONIQUE', 'INDUS', 'INFOTRONIQUE'];
  niveaux = ['NIVEAU_1', 'NIVEAU_2', 'NIVEAU_3'];
  groupes = ['Groupe_A', 'Groupe_B', 'Groupe_C', 'Groupe_D', 'Groupe_E'];
  semesters=['SEMESTER1','SEMESTER2','RATTRAPAGE'];
  TypeMatiere=['DS','EXAMEN','TP'];

  constructor(
    private fb: FormBuilder,
    private enseignantService: EnseignantService,
    private router: Router
  ) {
    this.enseignantForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      departement: ['', Validators.required],
      specialite: ['', Validators.required],
      niveau: ['', Validators.required],
      groupe: ['', Validators.required],
      semester:['',Validators.required],
      //TypeMatiere:['',Validators.required]

    });
  }
  showSuccessNotification = false;
  notificationMessage = '';

  onSubmit() {
    if (this.enseignantForm.valid) {
      this.enseignantService.saveEnseignant(this.enseignantForm.value).subscribe({
        next: (response) => {
          this.notificationMessage = 'Enseignant enregistré avec succès !';
          this.showSuccessNotification = true;

          setTimeout(() => {
            this.showSuccessNotification = false;
            this.router.navigate(['/enseignants']);
          }, 3000);
        },
        error: (err) => {
          this.notificationMessage = 'Erreur lors de l\'enregistrement: ' +
            (err.error?.message || 'Veuillez réessayer');
          this.showSuccessNotification = true;

          setTimeout(() => {
            this.showSuccessNotification = false;
          }, 3000);
        }
      });
    }
  }
}
