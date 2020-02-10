import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KYCWrapperPageComponent } from './ddx-kyc-wrapper.component';

describe('DdxKycWrapperComponent', () => {
  let component: KYCWrapperPageComponent;
  let fixture: ComponentFixture<KYCWrapperPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KYCWrapperPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KYCWrapperPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
