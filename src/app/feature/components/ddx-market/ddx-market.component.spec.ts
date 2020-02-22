import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketComponent } from './ddx-market.component';

describe('DdxMarketComponent', () => {
  let component: MarketComponent;
  let fixture: ComponentFixture<MarketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MarketComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
