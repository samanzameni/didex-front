import { Component, OnInit, Input } from '@angular/core';
import { TradeSymbol, OrderBookResponse, OrderBookRecord } from '@core/models';

import { Decimal } from 'decimal.js';

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

  get bidsSumArray(): Decimal[] {
    const result: Decimal[] = [];
    let sum: Decimal = new Decimal(0);
    for (const bidRow of this.bidsTableData) {
      sum = sum.add(bidRow.volume);
      result.push(sum);
    }
    return result;
  }

  get bidsSum(): Decimal {
    return this.bidsSumArray && this.bidsSumArray.length > 0
      ? this.bidsSumArray[this.bidsSumArray.length - 1]
      : new Decimal(0);
  }

  get asksSumArray(): Decimal[] {
    const result: Decimal[] = [];
    let sum: Decimal = new Decimal(0);
    for (const askRow of this.asksTableData) {
      sum = sum.add(askRow.volume);
      result.push(sum);
    }
    return result;
  }

  get asksSum(): Decimal {
    return this.asksSumArray && this.asksSumArray.length > 0
      ? this.asksSumArray[this.asksSumArray.length - 1]
      : new Decimal(0);
  }

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

  get asksTotal(): Decimal {
    let summation: Decimal = new Decimal(0);

    this.asksTableData.forEach(askRecord => {
      summation = summation.add(askRecord.volume);
    });

    return summation;
  }

  get bidsTotal(): Decimal {
    let summation: Decimal = new Decimal(0);

    this.bidsTableData.forEach(bidRecord => {
      summation = summation.add(
        new Decimal(bidRecord.volume).mul(bidRecord.price)
      );
    });

    return summation;
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
