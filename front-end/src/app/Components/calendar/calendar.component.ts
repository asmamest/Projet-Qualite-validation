
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  standalone:false,
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  currentDate: Date = new Date();
  weeks: (number | null)[][] = [];
  monthNames: string[] = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  dayNames: string[] = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  constructor() { }

  ngOnInit(): void {
    this.generateCalendarData();
  }

  generateCalendarData(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    // Premier jour du mois
    const firstDay = new Date(year, month, 1);
    // Dernier jour du mois
    const lastDay = new Date(year, month + 1, 0);

    // Ajuster pour commencer par lundi (1) au lieu de dimanche (0)
    let dayOfWeek = firstDay.getDay() || 7;
    dayOfWeek = dayOfWeek - 1; // 0 pour lundi, 6 pour dimanche

    const daysInMonth = lastDay.getDate();

    this.weeks = [];
    let days: (number | null)[] = [];

    // Jours du mois précédent
    for (let i = 0; i < dayOfWeek; i++) {
      days.push(null);
    }

    // Jours du mois actuel
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);

      if (days.length === 7) {
        this.weeks.push([...days]);
        days = [];
      }
    }

    // Jours du mois suivant
    if (days.length > 0) {
      while (days.length < 7) {
        days.push(null);
      }
      this.weeks.push([...days]);
    }
  }

  previousMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.generateCalendarData();
  }

  nextMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.generateCalendarData();
  }

  isToday(day: number | null): boolean {
    if (day === null) return false;

    const today = new Date();
    return (
      day === today.getDate() &&
      this.currentDate.getMonth() === today.getMonth() &&
      this.currentDate.getFullYear() === today.getFullYear()
    );
  }
}
