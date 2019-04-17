import { TestBed } from '@angular/core/testing';

import { ProjectClientService } from './project-client.service';

describe('ProjectClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectClientService = TestBed.get(ProjectClientService);
    expect(service).toBeTruthy();
  });
});
