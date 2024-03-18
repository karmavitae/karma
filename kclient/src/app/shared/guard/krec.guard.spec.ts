import { TestBed } from '@angular/core/testing';

import { KrecGuard } from './krec.guard';

describe('KrecGuard', () => {
  let guard: KrecGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(KrecGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
