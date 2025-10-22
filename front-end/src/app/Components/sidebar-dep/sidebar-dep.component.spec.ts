import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarDepComponent } from './sidebar-dep.component';

describe('SidebarDepComponent', () => {
  let component: SidebarDepComponent;
  let fixture: ComponentFixture<SidebarDepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarDepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarDepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
