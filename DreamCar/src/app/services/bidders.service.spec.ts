import { TestBed } from '@angular/core/testing';

import { BiddersService } from './bidders.service';

describe('BiddersService', () => {
  let service: BiddersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BiddersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
