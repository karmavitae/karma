import { TestBed } from '@angular/core/testing';

import { KspinnerService } from './kspinner.service';

describe('KspinnerService', () => {
  let service: KspinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KspinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
