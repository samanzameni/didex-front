import { Component, OnInit, Input } from '@angular/core';
import {
  TradeSymbol,
  TradeOrder,
  OrderBookResponse,
  OrderBookRecord,
} from '@core/models';

@Component({
  selector: 'ddx-order-book',
  templateUrl: './ddx-order-book.component.html',
  styleUrls: [
    '../../public/ddx-homepage-tables.scss',
    './ddx-order-book.component.scss',
  ],
})
export class OrderBookComponent implements OnInit {
  @Input() activeSymbol: TradeSymbol;
  @Input() orderBookData: OrderBookResponse;

  constructor() {}

  ngOnInit(): void {}

  get bidsTableData(): OrderBookRecord[] {
    return this.orderBookData
      ? this.orderBookData.bid.sort(this.bidSorter)
      : [];
  }

  get asksTableData(): OrderBookRecord[] {
    return this.orderBookData
      ? this.orderBookData.ask.sort(this.askSorter)
      : [];
  }

  private bidSorter(a: OrderBookRecord, b: OrderBookRecord): number {
    if (!a || !b) {
      return 0;
    }

    if (a.price < b.price) {
      return 1;
    }

    if (a.price === b.price) {
      return 0;
    }

    return -1;
  }

  private askSorter(a: OrderBookRecord, b: OrderBookRecord): number {
    if (!a || !b) {
      return 0;
    }

    if (a.price > b.price) {
      return 1;
    }

    if (a.price === b.price) {
      return 0;
    }

    return -1;
  }
}
