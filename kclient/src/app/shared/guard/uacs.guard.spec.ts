import { TestBed } from '@angular/core/testing';

import { UacsGuard } from './uacs.guard';

describe('UacsGuard', () => {
  let guard: UacsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UacsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
