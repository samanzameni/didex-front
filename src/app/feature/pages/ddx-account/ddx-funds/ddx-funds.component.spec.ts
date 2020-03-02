import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundsPageComponent } from './ddx-funds.component';

describe('DdxFundsComponent', () => {
  let component: FundsPageComponent;
  let fixture: ComponentFixture<FundsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FundsPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
