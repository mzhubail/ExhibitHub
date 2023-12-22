import { TestBed } from '@angular/core/testing';

import { ExploreEventsService } from './explore-events.service';

describe('ExploreEventsService', () => {
  let service: ExploreEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExploreEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
