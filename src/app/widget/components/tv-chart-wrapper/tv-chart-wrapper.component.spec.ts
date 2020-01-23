import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingViewChartWrapperComponent } from './tv-chart-wrapper.component';

describe('TvChartWrapperComponent', () => {
  let component: TradingViewChartWrapperComponent;
  let fixture: ComponentFixture<TradingViewChartWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TradingViewChartWrapperComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingViewChartWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
