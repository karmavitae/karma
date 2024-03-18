import { TestBed } from '@angular/core/testing';

import { KindexService } from './kindex.service';

describe('KindexService', () => {
  let service: KindexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KindexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
