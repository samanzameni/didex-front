import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KYCPersonalInfoPageComponent } from './ddx-kyc-personal-info.component';

describe('DdxKycPersonalInfoComponent', () => {
  let component: KYCPersonalInfoPageComponent;
  let fixture: ComponentFixture<KYCPersonalInfoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KYCPersonalInfoPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KYCPersonalInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
