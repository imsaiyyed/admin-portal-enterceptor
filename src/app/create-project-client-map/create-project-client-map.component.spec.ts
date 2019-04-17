import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProjectClientMapComponent } from './create-project-client-map.component';

describe('CreateProjectClientMapComponent', () => {
  let component: CreateProjectClientMapComponent;
  let fixture: ComponentFixture<CreateProjectClientMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProjectClientMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProjectClientMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
