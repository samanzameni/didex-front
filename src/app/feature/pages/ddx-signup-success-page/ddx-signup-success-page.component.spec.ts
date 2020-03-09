import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpSuccessPageComponent } from './ddx-signup-success-page.component';

describe('DdxSignupSuccessPageComponent', () => {
  let component: SignUpSuccessPageComponent;
  let fixture: ComponentFixture<SignUpSuccessPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpSuccessPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpSuccessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
