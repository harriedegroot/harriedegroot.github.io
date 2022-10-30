import { TestBed } from '@angular/core/testing';

import { ScrollingService } from './scrolling.service';

describe('ScollingService', () => {
  let service: ScrollingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
