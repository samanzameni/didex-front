import { Component, OnInit, Input } from '@angular/core';
import { TradeSymbol } from '@core/models';

@Component({
  selector: 'ddx-order-book',
  templateUrl: './ddx-order-book.component.html',
  styleUrls: ['./ddx-order-book.component.scss'],
})
export class OrderBookComponent implements OnInit {
  @Input() activeSymbol: TradeSymbol;

  constructor() {}

  ngOnInit(): void {}

  get tableData(): TradeSymbol[] {
    return this.activeSymbol ? [this.activeSymbol] : [];
  }
}
