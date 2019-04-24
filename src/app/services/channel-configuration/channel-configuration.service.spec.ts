import { TestBed } from '@angular/core/testing';

import { ChannelConfigurationService } from './channel-configuration.service';

describe('ChannelConfigurationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChannelConfigurationService = TestBed.get(ChannelConfigurationService);
    expect(service).toBeTruthy();
  });
});
