import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KYCIdentityProofPageComponent } from './ddx-kyc-identity-proof.component';

describe('DdxKycIdentityProofComponent', () => {
  let component: KYCIdentityProofPageComponent;
  let fixture: ComponentFixture<KYCIdentityProofPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KYCIdentityProofPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KYCIdentityProofPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
