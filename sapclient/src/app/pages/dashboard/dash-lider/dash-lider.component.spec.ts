import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashLiderComponent } from './dash-lider.component';

describe('DashLiderComponent', () => {
  let component: DashLiderComponent;
  let fixture: ComponentFixture<DashLiderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashLiderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashLiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
