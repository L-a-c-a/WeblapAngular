import { TestBed } from '@angular/core/testing';

import { KornyService } from './korny.service';

describe('KornyService', () => {
  let service: KornyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KornyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
