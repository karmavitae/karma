import { TestBed } from '@angular/core/testing';

import { KlobbyService } from './klobby.service';

describe('KlobbyService', () => {
  let service: KlobbyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KlobbyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
