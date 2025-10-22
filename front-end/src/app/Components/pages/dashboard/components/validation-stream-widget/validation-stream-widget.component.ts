/*import {
  Component,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounceTime, Subscription } from 'rxjs';
import { LayoutService } from '../../../../layout/layout.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-validation-stream-widget',
  standalone: false,
  templateUrl: './validation-stream-widget.component.html',
  styleUrls: ['./validation-stream-widget.component.css'],
})
export class ValidationStreamWidgetComponent implements OnInit, OnDestroy {
  chartData: any;
  chartOptions: any;
  subscription!: Subscription;
  apiUrl = 'http://localhost:8083/api/matieres/valides';

  constructor(
    private http: HttpClient,
    public layoutService: LayoutService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.subscription = this.layoutService.configUpdate$
      .pipe(debounceTime(25))
      .subscribe(() => {
        this.initChart();
      });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.fetchData();
    }
  }

  fetchData() {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        this.processChartData(data);
      },
      (error) => {
        console.error('Erreur lors de la récupération des données:', error);
      }
    );
  }

  processChartData(data: any[]) {
    const labels: string[] = [];
    const datasets: any[] = [];
    const niveauMap = new Map<string, number[]>();

    data.forEach((item) => {
      const departement = item.departement || 'Non spécifié';
      const niveau = item.niveau || 'Non spécifié';
      const total = item.total || 0;

      if (!labels.includes(departement)) {
        labels.push(departement);
      }

      if (!niveauMap.has(niveau)) {
        niveauMap.set(niveau, Array(labels.length).fill(0));
      }

      const index = labels.indexOf(departement);
      niveauMap.get(niveau)![index] = total;
    });

    const colors = ['#A3E0B9', '#77C77F', '#55B35C', '#3E8E41'];
    let colorIndex = 0;

    niveauMap.forEach((values, niveau) => {
      datasets.push({
        type: 'bar',
        label: niveau,
        backgroundColor: colors[colorIndex % colors.length],
        data: values,
        barThickness: 32,
      });
      colorIndex++;
    });

    this.chartData = { labels, datasets };
    this.initChart();
  }

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const borderColor = documentStyle.getPropertyValue('--surface-border');
      const textMutedColor = documentStyle.getPropertyValue('--text-color-secondary');

      this.chartOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          legend: {
            labels: { color: textColor },
          },
        },
        scales: {
          x: {
            stacked: true,
            ticks: { color: textMutedColor },
            grid: { color: 'transparent', borderColor: 'transparent' },
          },
          y: {
            stacked: true,
            ticks: { color: textMutedColor },
            grid: { color: borderColor, borderColor: 'transparent', drawTicks: false },
          },
        },
      };
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}*/
import {
  Component,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounceTime, Subscription } from 'rxjs';
import { LayoutService } from '../../../../layout/layout.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-validation-stream-widget',
  standalone:false,
  templateUrl: './validation-stream-widget.component.html',
  styleUrls: ['./validation-stream-widget.component.css'],
})
export class ValidationStreamWidgetComponent implements OnInit, OnDestroy {
  chartData: any;
  chartOptions: any;
  subscription!: Subscription;
  apiUrl = 'http://localhost:8083/api/matieres/valides';

  constructor(
    private http: HttpClient,
    public layoutService: LayoutService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    // Ne pas initialiser le chart côté serveur
    if (isPlatformBrowser(this.platformId)) {
      this.subscription = this.layoutService.configUpdate$
        .pipe(debounceTime(25))
        .subscribe(() => {
          this.initChart();
        });
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.fetchData();
    }
  }

  fetchData() {
    // Ne pas faire d'appel API côté serveur
    if (!isPlatformBrowser(this.platformId)) return;

    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        this.processChartData(data);
      },
      (error) => {
        console.error('Erreur lors de la récupération des données:', error);
      }
    );
  }

  processChartData(data: any[]) {
    // Cette partie peut rester identique car elle ne dépend pas du DOM
    const labels: string[] = [];
    const datasets: any[] = [];
    const niveauMap = new Map<string, number[]>();

    data.forEach((item) => {
      const departement = item.departement || 'Non spécifié';
      const niveau = item.niveau || 'Non spécifié';
      const total = item.total || 0;

      if (!labels.includes(departement)) {
        labels.push(departement);
      }

      if (!niveauMap.has(niveau)) {
        niveauMap.set(niveau, Array(labels.length).fill(0));
      }

      const index = labels.indexOf(departement);
      niveauMap.get(niveau)![index] = total;
    });

    const colors = ['#A3E0B9', '#77C77F', '#55B35C', '#3E8E41'];
    let colorIndex = 0;

    niveauMap.forEach((values, niveau) => {
      datasets.push({
        type: 'bar',
        label: niveau,
        backgroundColor: colors[colorIndex % colors.length],
        data: values,
        barThickness: 32,
      });
      colorIndex++;
    });

    this.chartData = { labels, datasets };
    this.initChart();
  }

  initChart() {
    // Ne pas initialiser le chart côté serveur
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const borderColor = documentStyle.getPropertyValue('--surface-border');
      const textMutedColor = documentStyle.getPropertyValue('--text-color-secondary');

      this.chartOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          legend: {
            labels: { color: textColor },
          },
        },
        scales: {
          x: {
            stacked: true,
            ticks: { color: textMutedColor },
            grid: { color: 'transparent', borderColor: 'transparent' },
          },
          y: {
            stacked: true,
            ticks: { color: textMutedColor },
            grid: { color: borderColor, borderColor: 'transparent', drawTicks: false },
          },
        },
      };
    } catch (e) {
      console.error('Erreur lors de l\'initialisation du chart:', e);
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
