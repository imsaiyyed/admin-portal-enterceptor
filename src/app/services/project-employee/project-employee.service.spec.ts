import { TestBed } from '@angular/core/testing';

import { ProjectEmployeeService } from './project-employee.service';

describe('ProjectEmployeeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectEmployeeService = TestBed.get(ProjectEmployeeService);
    expect(service).toBeTruthy();
  });
});
