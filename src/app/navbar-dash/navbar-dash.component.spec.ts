import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarDashComponent } from './navbar-dash.component';

describe('NavbarDashComponent', () => {
  let component: NavbarDashComponent;
  let fixture: ComponentFixture<NavbarDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
