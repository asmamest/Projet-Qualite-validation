import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-departements',
  standalone: false,
  templateUrl: './departements.component.html',
  styleUrl: './departements.component.css'
})
export class DepartementsComponent {

  constructor(private router: Router) {}

  navigate() { this.router.navigate(['niveau-groupe']);

  }
}
