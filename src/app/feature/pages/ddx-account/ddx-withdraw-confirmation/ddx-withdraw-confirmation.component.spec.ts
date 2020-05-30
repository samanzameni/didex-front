import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawConfirmationPageComponent } from './ddx-withdraw-confirmation.component';

describe('WithdrawConfirmationPageComponent', () => {
  let component: WithdrawConfirmationPageComponent;
  let fixture: ComponentFixture<WithdrawConfirmationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WithdrawConfirmationPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawConfirmationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
