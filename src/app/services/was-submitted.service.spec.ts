import { TestBed } from '@angular/core/testing';

import { WasSubmittedService } from './was-submitted.service';

describe('WasSubmittedService', () => {
  let service: WasSubmittedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WasSubmittedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
