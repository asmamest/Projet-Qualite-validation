import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { StatDepService } from '../../Services/StatDep.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { animate, style, transition, trigger } from '@angular/animations';

interface ExamLevel {
  niveau: string;
  NoreturnedPercentage: number;
  NoverifiedPercentage: number;
}
@Component({
  selector: 'app-dashboard-infotr',
  standalone: false,
  templateUrl: './dashboard-infotr.component.html',
  styleUrl: './dashboard-infotr.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})


export class DashboardInfotrComponent implements OnInit{
  niveauLabels = ['NIVEAU_1', 'NIVEAU_2', 'NIVEAU_3'];
  levelsData: ExamLevel[] = [];
  enseignantStat: number = 0;

  chartData: { [key: string]: ChartConfiguration<'bar'> } = {};

  constructor(private service: StatDepService) {}

  ngOnInit(): void {
    this.fetchAllMatiereStats();
    this.fetchEnseignantStats();
  }

  fetchAllMatiereStats(): void {
    this.niveauLabels.forEach(niveau => {
      this.service.getMatiereStats('ELECTRIQUE', 'INFOTRONIQUE', niveau)
        .subscribe(stats => {
          const levelStats: ExamLevel = {
            niveau: niveau,
            NoreturnedPercentage: stats[0],
            NoverifiedPercentage: stats[1]
          };
          this.levelsData.push(levelStats);

          // Initialize chart data for this level
          this.chartData[niveau] = {
            type: 'bar',
            data: {
              labels: ['Non retournés', 'Non vérifiés'],
              datasets: [{
                data: [stats[0], stats[1]],
                label: niveau,
                backgroundColor: ['#f39c12', '#e74c3c']
              }]
            },
            options: {
              responsive: true,
              plugins: {
                legend: { display: false },
                title: { display: true, text: `Statistiques pour ${niveau}` },
                datalabels: {
                  anchor: 'end',
                  align: 'start',
                  offset: 10,
                  formatter: (value: number) => value.toFixed(2) + '%',
                  font: {
                    weight: 'bold'
                  }
                }
              },
              scales: {
                y: {
                  ticks: {
                    display: false
                  },
                  grid: {
                    display: false
                  }
                },
                x: {
                  grid: {
                    display: false
                  }
                }
              }
            },
            plugins: [ChartDataLabels]
          };
        });
    });
  }


  fetchEnseignantStats(): void {
    this.service.getEnseignantStats('ELECTRIQUE', 'INFOTRONIQUE')
      .subscribe(stat => {
        this.enseignantStat = stat;
      });
  }
}
