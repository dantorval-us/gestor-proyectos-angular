import { TestBed } from '@angular/core/testing';

import { ColumnaService } from './columna.service';

describe('ColumnaService', () => {
  let service: ColumnaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColumnaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
