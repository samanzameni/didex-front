import { TestBed } from '@angular/core/testing';

import { KYCGuard } from './kyc.guard';

describe('KycGuard', () => {
  let guard: KYCGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(KYCGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
