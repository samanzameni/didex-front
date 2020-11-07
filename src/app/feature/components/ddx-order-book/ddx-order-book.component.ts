import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {
  TradeSymbol,
  OrderBookResponse,
  OrderBookRecord,
  OrderClickEventData,
} from '@core/models';

import { Decimal } from 'decimal.js';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectionService } from '@core/services';
import { Observable } from 'rxjs';
import { LocalePipe } from '@widget/pipes/ddx-locale.pipe';

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

  @Output() clickOnRecord: EventEmitter<OrderClickEventData>;

  constructor(
    private snackbarService: MatSnackBar,
    private directionService: DirectionService,
    private localePipe: LocalePipe
  ) {
    this.clickOnRecord = new EventEmitter();
  }

  ngOnInit(): void {}

  get direction$(): Observable<string> {
    return this.directionService.direction$;
  }

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
      ? this.mergeTableData(this.orderBookData.bid, false)
      : [];
  }

  get asksTableData(): OrderBookRecord[] {
    return this.orderBookData
      ? this.mergeTableData(this.orderBookData.ask)
      : [];
  }

  private mergeTableData(
    originalRecords: OrderBookRecord[],
    isAsk: boolean = true
  ): OrderBookRecord[] {
    const mergedRecords: OrderBookRecord[] = [];

    let shouldPush: boolean;
    for (const record of originalRecords) {
      shouldPush = true;
      for (const alreadyInRecord of mergedRecords) {
        if (record.price === alreadyInRecord.price) {
          shouldPush = false;
          alreadyInRecord.volume = new Decimal(alreadyInRecord.volume)
            .add(record.price)
            .toNumber();
          break;
        }
      }

      if (shouldPush) {
        mergedRecords.push({ ...record });
      }
    }

    const sorter = isAsk ? this.askSorter : this.bidSorter;
    return mergedRecords.sort(sorter);
  }

  get asksTotal(): Decimal {
    let summation: Decimal = new Decimal(0);

    this.asksTableData.forEach((askRecord) => {
      summation = summation.add(askRecord.volume);
    });

    return summation;
  }

  get bidsTotal(): Decimal {
    let summation: Decimal = new Decimal(0);

    this.bidsTableData.forEach((bidRecord) => {
      summation = summation.add(
        new Decimal(bidRecord.volume).mul(bidRecord.price)
      );
    });

    return summation;
  }

  handleClickOnRecord(amount: Decimal, price: number): void {
    const dataToEmit: OrderClickEventData = {
      amount: amount.toNumber(),
      price,
    };

    this.snackbarService.open(
      this.localePipe.transform('homepage.order_book.snack_record_copied'),
      '',
      { duration: 700 }
    );
    this.clickOnRecord.emit(dataToEmit);
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
