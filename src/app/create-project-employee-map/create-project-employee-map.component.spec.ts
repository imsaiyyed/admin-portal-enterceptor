import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProjectEmployeeMapComponent } from './create-project-employee-map.component';

describe('CreateProjectEmployeeMapComponent', () => {
  let component: CreateProjectEmployeeMapComponent;
  let fixture: ComponentFixture<CreateProjectEmployeeMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProjectEmployeeMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProjectEmployeeMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
