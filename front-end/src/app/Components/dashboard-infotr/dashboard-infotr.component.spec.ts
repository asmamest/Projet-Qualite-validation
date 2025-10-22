import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInfotrComponent } from './dashboard-infotr.component';

describe('DashboardInfotrComponent', () => {
  let component: DashboardInfotrComponent;
  let fixture: ComponentFixture<DashboardInfotrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardInfotrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardInfotrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
