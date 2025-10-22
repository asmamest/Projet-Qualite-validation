import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEnseignantComponent } from './add-enseignant.component';

describe('AddEnseignantComponent', () => {
  let component: AddEnseignantComponent;
  let fixture: ComponentFixture<AddEnseignantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEnseignantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
