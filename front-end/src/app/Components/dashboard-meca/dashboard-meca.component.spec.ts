import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMecaComponent } from './dashboard-meca.component';

describe('DashboardMecaComponent', () => {
  let component: DashboardMecaComponent;
  let fixture: ComponentFixture<DashboardMecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardMecaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardMecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
