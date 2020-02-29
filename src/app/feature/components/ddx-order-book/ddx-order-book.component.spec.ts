import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBookComponent } from './ddx-order-book.component';

describe('DdxOrderBookComponent', () => {
  let component: OrderBookComponent;
  let fixture: ComponentFixture<OrderBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderBookComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
