import { TestBed } from '@angular/core/testing';

import { SeKozosService } from './se-kozos.service';

describe('SeKozosService', () => {
  let service: SeKozosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeKozosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
