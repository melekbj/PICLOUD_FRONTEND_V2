import { TestBed } from '@angular/core/testing';

import { JwtAuthServiceService } from '././JwtAuthService.service';

describe('JwtService', () => {
  let service: JwtAuthServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtAuthServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
