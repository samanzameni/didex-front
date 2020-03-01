import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradesComponent } from './ddx-trades.component';

describe('DdxTradesComponent', () => {
  let component: TradesComponent;
  let fixture: ComponentFixture<TradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TradesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
