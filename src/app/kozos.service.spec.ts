import { TestBed } from '@angular/core/testing';

import { KozosService } from './kozos.service';

describe('KozosService', () => {
  let service: KozosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KozosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
