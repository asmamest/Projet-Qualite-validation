import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarwidgetComponent } from './topbarwidget.component';

describe('TopbarwidgetComponent', () => {
  let component: TopbarwidgetComponent;
  let fixture: ComponentFixture<TopbarwidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopbarwidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopbarwidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
