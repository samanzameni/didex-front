import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KYCPhoneVerificationPageComponent } from './ddx-kyc-phone-verification.component';

describe('DdxKycPhoneVerificationComponent', () => {
  let component: KYCPhoneVerificationPageComponent;
  let fixture: ComponentFixture<KYCPhoneVerificationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KYCPhoneVerificationPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KYCPhoneVerificationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
