import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: false,
  styleUrl: 'app.component.css'
})
export class AppComponent {
  title = 'ExamState';
  showside = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Optional: Uncomment and implement token/role logic if needed
        // const token = localStorage.getItem('token');
        // const userRole = token ? TokenService.getRoleFromToken(token) : null;

        this.showside = !(
          event.url.includes('/login') ||
          event.url.includes('/layout') ||
          event.url.includes('/dashboard-info')
          // || !this.isRoleAllowed(userRole)
        );
      }
    });
  }

  private isRoleAllowed(role: string | null): boolean {
    const allowedRoles = ['Responsable_etudes', 'Responsable_examens', 'Responsable_Deliberation'];
    return role ? allowedRoles.includes(role) : false;
  }
}
