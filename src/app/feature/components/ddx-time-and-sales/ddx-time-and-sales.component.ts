import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TradeSymbol, Trade, OrderSide } from '@core/models';
import { TraderService } from '@core/services';

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

  @Output() loadNextPage: EventEmitter<any>;

  constructor(private traderService: TraderService) {
    this.loadNextPage = new EventEmitter();
  }

  ngOnInit(): void {}

  getPriceCellCSSClass(row: Trade): string {
    return row.side === OrderSide.Buy ? 'green' : 'red';
  }

  get tableData(): Trade[] {
    return this.tradeData || [];
  }

  get traderTimezone() {
    return this.traderService.currentTrader.generalInformation.timeZone.slice(
      4,
      10
    );
  }

  get traderTimezoneTitle() {
    return this.traderService.currentTrader.generalInformation.timeZone.slice(
      12
    );
  }

  onScroll(): void {
    this.loadNextPage.emit(null);
  }
}
