import { TestBed } from '@angular/core/testing';

import { MainService } from './main-service';
import { provideHttpClient } from '@angular/common/http';

describe('MainService', () => {
  let service: MainService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(MainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
