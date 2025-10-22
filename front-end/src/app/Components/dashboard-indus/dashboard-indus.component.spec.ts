import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardIndusComponent } from './dashboard-indus.component';

describe('DashboardIndusComponent', () => {
  let component: DashboardIndusComponent;
  let fixture: ComponentFixture<DashboardIndusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardIndusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardIndusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
