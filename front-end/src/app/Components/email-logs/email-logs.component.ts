

import { Component, OnInit } from '@angular/core';
import { EnseignantService } from '../../Services/enseignant.service';

@Component({
  selector: 'app-email-logs',
  standalone:false,
  templateUrl: 'email-logs.component.html',
  styleUrls: ['email-logs.component.scss']
})
export class EmailLogsComponent implements OnInit {
  emailLogs: any[] = [];

  constructor(private enseignantService: EnseignantService) {}

  ngOnInit(): void {
    this.loadEmailLogs();
  }

  loadEmailLogs() {
    this.enseignantService.getAllEmailLogs().subscribe(
      (data) => {
        this.emailLogs = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des logs email', error);
      }
    );
  }
}
