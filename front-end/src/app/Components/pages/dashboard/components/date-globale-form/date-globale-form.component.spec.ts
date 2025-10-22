import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateGlobaleFormComponent } from './date-globale-form.component';

describe('DateGlobaleFormComponent', () => {
  let component: DateGlobaleFormComponent;
  let fixture: ComponentFixture<DateGlobaleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateGlobaleFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateGlobaleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
