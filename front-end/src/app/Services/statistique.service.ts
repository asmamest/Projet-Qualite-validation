import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"

export interface DashboardStats {
  unsubmittedExams: number
  unvalidatedNotes: number
  totalTeachers: number
  lateTeachers: number
  unreadComplaints: number
  respondedComplaints: number
}

@Injectable({
  providedIn: "root",
})
export class StatistiqueService {
  private apiUrl = "http://localhost:8083/api/statistiques"

  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/dashboard`)
  }
}
