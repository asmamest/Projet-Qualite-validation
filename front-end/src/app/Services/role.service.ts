import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoleService {

  getDashboardRoute(role: string): string {
    const roleRoutes: { [key: string]: string } = {
      'Chef_Dep_info': '/dashboard-info',
      'Responsable_etudes': '/layout',
      'Responsable_examens':'/layout',
      'Responsable_Deliberation': '/layout',
      'Chef_Dep_indus':'/dashboard-idus',
      'Chef_Dep_electrique':'/electrique-specialite'

    };

    return roleRoutes[role] || '/layout'; // fallback
  }
}
