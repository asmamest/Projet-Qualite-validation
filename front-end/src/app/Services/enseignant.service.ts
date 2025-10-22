import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnseignantService {
  private apiUrl = 'http://localhost:8083/api/enseignants';

  constructor(private http: HttpClient) { }

  // Ajoutez cette méthode manquante
  getAllEnseignants(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  // Vos autres méthodes existantes2
  saveEnseignant(enseignant: any): Observable<any> {
    return this.http.post(this.apiUrl, enseignant);
  }

  getEnseignantsByFilters(
    departement: string,
    specialite: string,
    niveau: string,
    groupe: string,
    semester: string,
    TypeMatiere: string
  ): Observable<any> {
    // Ajoutez des logs pour débogage
    console.log('Params envoyés:', { departement, specialite, niveau, groupe ,semester,TypeMatiere});

    return this.http.get(`${this.apiUrl}/filter`, {
      params: {
        departement: departement,
        specialite: specialite,
        niveau: niveau,
        groupe: groupe,
        semester:semester,
        TypeMatiere:TypeMatiere
      }
    }).pipe(
      tap(response => console.log('Réponse API:', response)),
      catchError(error => {
        console.error('Erreur API:', error);
        return throwError(error);
      })
    );
  }
  deleteEnseignant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getMatieresByEnseignant(enseignantId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/enseignant/${enseignantId}`);
  }
  getAllEmailLogs(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8083/api/email-logs');
  }
  deleteAllEnseignants() {
    return this.http.delete(this.apiUrl);
  }


}
