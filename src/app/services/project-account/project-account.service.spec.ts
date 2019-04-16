import { TestBed } from '@angular/core/testing';

import { ProjectAccountService } from './project-account.service';

describe('ProjectAccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectAccountService = TestBed.get(ProjectAccountService);
    expect(service).toBeTruthy();
  });
});
