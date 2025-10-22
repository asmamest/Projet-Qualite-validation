import { Component } from '@angular/core';
import { EnseignantService } from '../../Services/enseignant.service';
import { Enseignant } from '../../models/enseignant.model';

@Component({
  selector: 'app-enseignant-list',
  standalone: false,
  templateUrl: './enseignant-list.component.html',
  styleUrl: './enseignant-list.component.scss'
})
export class EnseignantListComponent {
  enseignants: Enseignant[] = [];
  isLoading = true;

  constructor(private enseignantService: EnseignantService) {}

  ngOnInit(): void {
    this.loadEnseignants();
  }

  loadEnseignants(): void {
    this.isLoading = true;
    this.enseignantService.getAllEnseignants().subscribe({
      next: (data) => {
        this.enseignants = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des enseignants', err);
        this.isLoading = false;
      }
    });
  }

  deleteEnseignant(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet enseignant ?')) {
      this.enseignantService.deleteEnseignant(id).subscribe({
        next: () => {
          this.enseignants = this.enseignants.filter(e => e.id !== id);
          alert('Enseignant supprimé avec succès');
        },
        error: (err) => {
          console.error('Erreur lors de la suppression', err);
          alert('Échec de la suppression');
        }
      });
    }
  }
  deleteAll() {
    this.enseignantService.deleteAllEnseignants().subscribe({
      next: () => {
        alert('All enseignants deleted successfully!');
      },
      error: (err) => {
        if (err.status === 404) {
          alert('No enseignants found to delete.');
        } else {
          alert('An error occurred.');
        }
      }
    });
  }

}
