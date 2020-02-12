import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KYCSelfiePageComponent } from './ddx-kyc-selfie.component';

describe('DdxKycSelfieComponent', () => {
  let component: KYCSelfiePageComponent;
  let fixture: ComponentFixture<KYCSelfiePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KYCSelfiePageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KYCSelfiePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
