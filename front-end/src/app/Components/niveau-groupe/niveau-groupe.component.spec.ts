import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NiveauGroupeComponent } from './niveau-groupe.component';

describe('NiveauGroupeComponent', () => {
  let component: NiveauGroupeComponent;
  let fixture: ComponentFixture<NiveauGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NiveauGroupeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NiveauGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
