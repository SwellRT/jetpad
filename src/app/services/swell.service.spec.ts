import { TestBed, inject } from '@angular/core/testing';

import { SwellService } from './swell.service';

describe('SwellService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SwellService]
    });
  });

  it('should be created', inject([SwellService], (service: SwellService) => {
    expect(service).toBeTruthy();
  }));
});
