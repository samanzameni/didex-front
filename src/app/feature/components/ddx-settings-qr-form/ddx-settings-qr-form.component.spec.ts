import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsQRFormComponent } from './ddx-settings-qr-form.component';

describe('SettingsQRFormComponent', () => {
  let component: SettingsQRFormComponent;
  let fixture: ComponentFixture<SettingsQRFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsQRFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsQRFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
