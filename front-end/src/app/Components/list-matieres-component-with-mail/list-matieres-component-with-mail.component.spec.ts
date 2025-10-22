import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMatieresComponentWithMail } from './list-matieres-component-with-mail.component';

describe('ListMatieresComponentWithMailComponent', () => {
  let component: ListMatieresComponentWithMail;
  let fixture: ComponentFixture<ListMatieresComponentWithMail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListMatieresComponentWithMail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMatieresComponentWithMail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
