import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-Calendar',
  templateUrl: './app-calendar.component.html',
  styleUrls: ['./app-calendar.component.scss'],
  standalone:false
})
export class AppCalendarComponent {
  selectedDate: Date = new Date(); // ✅ This defines selectedDate

  @Output() dateSelected = new EventEmitter<Date>();

  onDateChange(event: any) { // ✅ This defines onDateChange
    this.dateSelected.emit(this.selectedDate);
  }
}
