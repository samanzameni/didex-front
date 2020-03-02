import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KYCDonePageComponent } from './ddx-kyc-done.component';

describe('DdxKycDoneComponent', () => {
  let component: KYCDonePageComponent;
  let fixture: ComponentFixture<KYCDonePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KYCDonePageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KYCDonePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
