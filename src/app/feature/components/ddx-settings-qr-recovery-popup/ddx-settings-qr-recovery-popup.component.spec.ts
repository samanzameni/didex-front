import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsQrRecoveryPopupComponent } from './ddx-settings-qr-recovery-popup.component';

describe('SettingsQrRecoveryPopupComponent', () => {
  let component: SettingsQrRecoveryPopupComponent;
  let fixture: ComponentFixture<SettingsQrRecoveryPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsQrRecoveryPopupComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsQrRecoveryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
