import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectriqueSpecialiteComponent } from './electrique-specialite.component';

describe('ElectriqueSpecialiteComponent', () => {
  let component: ElectriqueSpecialiteComponent;
  let fixture: ComponentFixture<ElectriqueSpecialiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ElectriqueSpecialiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectriqueSpecialiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
