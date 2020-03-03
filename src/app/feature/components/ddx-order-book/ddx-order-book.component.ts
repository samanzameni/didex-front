import { Component, OnInit, Input } from '@angular/core';
import { TradeSymbol, TradeOrder } from '@core/models';

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
  @Input() orderData: TradeOrder[];

  constructor() {}

  ngOnInit(): void {}

  get tableData(): TradeOrder[] {
    return [];
  }
}
