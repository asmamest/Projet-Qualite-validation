import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationStreamWidgetComponent } from './validation-stream-widget.component';

describe('ValidationStreamWidgetComponent', () => {
  let component: ValidationStreamWidgetComponent;
  let fixture: ComponentFixture<ValidationStreamWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValidationStreamWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationStreamWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
