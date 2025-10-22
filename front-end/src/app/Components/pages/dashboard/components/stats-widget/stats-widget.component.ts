import { Component, OnInit } from '@angular/core';
import { DashboardStats, StatistiqueService } from '../../../../../Services/statistique.service';

@Component({
  selector: 'app-stats-widget',
  standalone: false,
  templateUrl: './stats-widget.component.html',
  styleUrl: './stats-widget.component.css'
})
export class StatsWidgetComponent implements OnInit {
  stats: DashboardStats = {
    unsubmittedExams: 0,
    unvalidatedNotes: 0,
    totalTeachers: 0,
    lateTeachers: 0,
    unreadComplaints: 0,
    respondedComplaints: 0,
  }
  loading = true
  error = ""

  constructor(private statistiqueService: StatistiqueService) {}

  ngOnInit(): void {
    this.loadDashboardStats()
  }

  loadDashboardStats(): void {
    this.loading = true
    this.statistiqueService.getDashboardStats().subscribe(
      (data) => {
        this.stats = data
        this.loading = false
      },
      (error) => {
        console.error("Erreur lors du chargement des statistiques", error)
        this.error = "Impossible de charger les statistiques"
        this.loading = false
      },
    )
  }
}
