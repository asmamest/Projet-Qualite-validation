import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {LoginRequest} from '../models/login-request.model';
import {LoginResponse} from '../models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8083/api/auth/login'; // Spring Boot endpoint

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    const headers = new HttpHeaders(
      {'Content-Type': 'application/json',
      'Accept': 'application/json'});
    return this.http.post<LoginResponse>(this.apiUrl, credentials, { headers });
  }
}
