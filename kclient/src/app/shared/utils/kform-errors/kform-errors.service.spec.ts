import { TestBed } from '@angular/core/testing';

import { KformErrorsService } from './kform-errors.service';

describe('KformErrorsService', () => {
  let service: KformErrorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KformErrorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
