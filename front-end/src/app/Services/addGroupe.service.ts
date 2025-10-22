import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AddUserRequest} from '../models/AddUser-request.model';
import {Observable} from 'rxjs';
import {AddUserResponse} from '../models/AddUserResponse.model';
import {AddGroupeRequest} from '../models/AddGroupe-request.model';
import {AddGroupeResponse} from '../models/AddGroupe-response.model';

@Injectable({
  providedIn: 'root'
})
export class addGroupeService {
  private apiUrl = 'http://localhost:8083/api/groupe'; // Spring Boot endpoint

  constructor(private http: HttpClient) {}

  saveGroup(credentials: AddGroupeRequest): Observable<AddGroupeResponse>
  { const headers = new HttpHeaders(
    {'Content-Type': 'application/json',
      'Accept': 'application/json'});

    return this.http.post<AddGroupeResponse>(`${this.apiUrl}`, credentials,{ headers });

  }
}
