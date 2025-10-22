import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureswidgetComponent } from './featureswidget.component';

describe('FeatureswidgetComponent', () => {
  let component: FeatureswidgetComponent;
  let fixture: ComponentFixture<FeatureswidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeatureswidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureswidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
