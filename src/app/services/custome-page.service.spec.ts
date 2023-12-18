import { TestBed } from '@angular/core/testing';

import { CustomePageService } from './custome-page.service';

describe('CustomePageService', () => {
  let service: CustomePageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomePageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
