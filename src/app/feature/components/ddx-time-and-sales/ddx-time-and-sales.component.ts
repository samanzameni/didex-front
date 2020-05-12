import { Component, OnInit, Input } from '@angular/core';
import { TradeSymbol, Trade, OrderSide } from '@core/models';

@Component({
  selector: 'ddx-time-and-sales',
  templateUrl: './ddx-time-and-sales.component.html',
  styleUrls: [
    '../../public/ddx-homepage-tables.scss',
    './ddx-time-and-sales.component.scss',
  ],
})
export class TimeAndSalesComponent implements OnInit {
  @Input() activeSymbol: TradeSymbol;
  @Input() tradeData: Trade[];

  constructor() {}

  ngOnInit(): void {}

  getPriceCellCSSClass(row: Trade): string {
    return row.side === OrderSide.Buy ? 'green' : 'red';
  }

  get tableData(): Trade[] {
    return this.tradeData || [];
  }
}
