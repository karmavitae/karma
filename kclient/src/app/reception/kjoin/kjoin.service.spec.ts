import { TestBed } from '@angular/core/testing';

import { KjoinService } from './kjoin.service';

describe('KjoinService', () => {
  let service: KjoinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KjoinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
