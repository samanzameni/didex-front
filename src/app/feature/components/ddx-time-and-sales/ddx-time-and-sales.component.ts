import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TradeSymbol, Trade, OrderSide } from '@core/models';
import { TraderService } from '@core/services';
import { TIMEZONES } from '@core/util/constants';
import * as moment from 'moment-timezone';

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

  private timezoneAbbr: string = 'UTC';
  private convertedTimezones: string[];

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

  get traderTimezoneOffset() {
    return (
      this.traderService.currentTrader.generalInformation.timeZone.slice(
        4,
        10
      ) || '+0000'
    );
  }

  get traderTimezoneText() {
    return this.traderService.currentTrader.generalInformation.timeZone;
  }

  get traderTimezoneTitleAbbr(): string {
    return this.timezoneAbbr;
  }

  onScroll(): void {
    this.loadNextPage.emit(null);
    var a = moment
      .tz(this.tableData[2].timeStamp, 'Asia/Singapore')
      .format('YYYY/MM/DD, HH:MM A');
    console.log(a);
  }
}
