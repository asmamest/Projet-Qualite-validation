import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  getExamData(): Observable<any[]> {
    // Mock data - in a real application, this would come from an API
    const mockData = [
      { group: 'Group A', percentage: 65 },
      { group: 'Group B', percentage: 78 },
      { group: 'Group C', percentage: 42 }
    ];

    return of(mockData);
  }

  getPendingProfessors(): Observable<number> {
    // Mock data - in a real application, this would come from an API
    return of(7);
  }
}
