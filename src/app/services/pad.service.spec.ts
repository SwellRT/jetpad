import { TestBed, inject } from '@angular/core/testing';

import { PadService } from './pad.service';

describe('PadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PadService]
    });
  });

  it('should be created', inject([PadService], (service: PadService) => {
    expect(service).toBeTruthy();
  }));
});
