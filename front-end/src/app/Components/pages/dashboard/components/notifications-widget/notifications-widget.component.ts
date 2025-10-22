import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-notifications-widget',
  standalone: false,
  templateUrl: './notifications-widget.component.html',
  styleUrl: './notifications-widget.component.css',
})
export class NotificationsWidgetComponent {
  items = [
    { label: 'Add New', icon: 'pi pi-fw pi-plus' },
    { label: 'Remove', icon: 'pi pi-fw pi-trash' },
  ];
}
