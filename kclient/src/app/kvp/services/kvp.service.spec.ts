import { TestBed } from '@angular/core/testing';

import { KvpService } from './kvp.service';

describe('KvpService', () => {
  let service: KvpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KvpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
