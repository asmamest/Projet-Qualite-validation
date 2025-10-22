import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'http://localhost:8083/api/email'; // Adaptez selon votre URL backend

  constructor(private http: HttpClient) { }

  sendEmail(toEmail: string, teacherName: string): Observable<any> {
    const body = {
      email: toEmail,
      teacherName: teacherName
    };

    return this.http.post(`${this.apiUrl}/send-to-teacher`, body, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json' // Explicitement spécifier qu'on attend du JSON
    });
  }
}
