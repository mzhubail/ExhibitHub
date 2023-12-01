import { TestBed } from '@angular/core/testing';

import { CustomEventService } from './custom-event.service';

describe('CustomEventService', () => {
  let service: CustomEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
