import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-footerwidget',
  standalone: false,
  templateUrl: './footerwidget.component.html',
  styleUrl: './footerwidget.component.css',
})
export class FooterwidgetComponent {
  constructor(public router: Router) {}
}
