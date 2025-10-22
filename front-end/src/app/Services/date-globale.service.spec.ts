import { TestBed } from '@angular/core/testing';

import { DateGlobaleService } from './date-globale.service';

describe('DateGlobaleService', () => {
  let service: DateGlobaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateGlobaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
