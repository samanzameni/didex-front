import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateEmailPageComponent } from './ddx-activate-email-page.component';

describe('ActivateEmailPageComponent', () => {
  let component: ActivateEmailPageComponent;
  let fixture: ComponentFixture<ActivateEmailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActivateEmailPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateEmailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
