import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatDepService {

  private apiUrl = 'http://localhost:8083/api'; // Base URL of your backend endpoint

  constructor(private http: HttpClient) {}

  /**
   * Fetches percentage of non-recu and non-valide matieres
   * @param dep DepartementEnum as string (e.g., 'INFORMATIQUE')
   * @param spec SpecialiteEnum as string (e.g., 'GENIE_LOGICIEL')
   * @param niv NiveauEnum as string (e.g., 'TROISIEME')
   * @returns Observable of [pourcentageNonRecu, pourcentageNonValide]
   */

  getMatiereStats(dep: string, spec: string, niv: string): Observable<number[]> {
    const params = new HttpParams()
      .set('dep', dep)
      .set('spec', spec)
      .set('niv', niv);

    return this.http.get<number[]>(`${this.apiUrl}/matieres/stats`, { params });
  }

  getEnseignantStats(dep: string, spec: string): Observable<number> {
    const params = new HttpParams()
      .set('dep', dep)
      .set('spec', spec)

    return this.http.get<number>(`${this.apiUrl}/enseignants/stat`, { params });
  }

}
