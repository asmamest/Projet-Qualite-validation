import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { GlobalDate } from "../../app/models/global-date.models"

@Injectable({
  providedIn: "root",
})
export class DateGlobaleService {
  private apiUrl = "http://localhost:8083/api/dates-globales"

  constructor(private http: HttpClient) {}

  getAllDates(): Observable<GlobalDate[]> {
    return this.http.get<GlobalDate[]>(this.apiUrl)
  }

  getActiveDate(nom: string): Observable<GlobalDate> {
    return this.http.get<GlobalDate>(`${this.apiUrl}/${nom}`)
  }

  saveDate(date: GlobalDate): Observable<GlobalDate> {
    return this.http.post<GlobalDate>(this.apiUrl, date)
  }

  getDateTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/types`)
  }
}
