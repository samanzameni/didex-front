import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositCallbackHandlerPageComponent } from './ddx-fiat-deposit-callback-handler.component';

describe('DepositCallbackHandlerPageComponent', () => {
  let component: DepositCallbackHandlerPageComponent;
  let fixture: ComponentFixture<DepositCallbackHandlerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DepositCallbackHandlerPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositCallbackHandlerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
