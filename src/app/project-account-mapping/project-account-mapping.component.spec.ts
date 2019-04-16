import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAccountMappingComponent } from './project-account-mapping.component';

describe('ProjectAccountMappingComponent', () => {
  let component: ProjectAccountMappingComponent;
  let fixture: ComponentFixture<ProjectAccountMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectAccountMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAccountMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
