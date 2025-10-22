import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Update, UpdateService } from '../../../../../Services/update.service';

@Component({
  selector: 'app-history-widget',
  standalone: false,
  templateUrl: './history-widget.component.html',
  styleUrl: './history-widget.component.css',
})
export class HistoryWidgetComponent implements OnInit {
  updates: Update[] = [];
  constructor(private updateService: UpdateService) {}

  ngOnInit(): void {
    this.updateService.getHistoriques().subscribe((data) => {
      this.updates = data;
    });
  }

}
