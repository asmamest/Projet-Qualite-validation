import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Update {
  enseignant: string;
  nomMatiere: string;
  departement: string;
  niveau: string;
  recu: boolean;
  valide: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  private apiUrl = 'http://localhost:8083/api/matieres/recent';

  constructor(private http: HttpClient) {
  }

  getHistoriques(): Observable<Update[]> {
    return this.http.get<Update[]>(this.apiUrl);
  }
}
