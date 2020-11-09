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

  ngOnInit(): void {
    // if (this.traderService.currentTrader && this.traderTimezoneText) {
    //   TIMEZONES.forEach((timezone) => {
    //     if (timezone.ianaTimeZoneId.includes(this.traderTimezoneText)) {
    //       this.timezoneAbbr = timezone.abbreviation;
    //       return;
    //     }
    //   });
    // }

    // var convertedTime = moment
    //   .tz(this.tableData[2].timeStamp, this.traderTimezoneText)
    //   .format('YYYY/MM/DD, HH:MM A');
    // console.log(convertedTime);

    // this.traderTimezoneText;

    // if (this.traderTimezoneText) {
    //   this.tableData.forEach((tradedata) => {
    //     if (tradedata.timeStamp.includes(this.traderTimezoneText)) {
    //       this.convertedTimezones = moment
    //         .tz(tradedata.timeStamp, this.traderTimezoneText)
    //         .format('YYYY/MM/DD, HH:MM A');
    //     }
    //   });
    // }
    if (this.traderTimezoneText) {
      for (let i = 0; i < this.tradeData.length; i++) {
        this.convertedTimezones[i] = moment
          .tz(this.tradeData[i].timeStamp, this.traderTimezoneText)
          .format('YYYY/MM/DD, HH:MM A');
      }
    }

    console.log(this.convertedTimezones);
  }

  getPriceCellCSSClass(row: Trade): string {
    return row.side === OrderSide.Buy ? 'green' : 'red';
  }

  get tableData(): Trade[] {
    return this.tradeData || [];
  }

  get traderTimezoneOffset() {
    // console.log(this.traderService.currentTrader.generalInformation.timeZone);
    return (
      this.traderService.currentTrader.generalInformation.timeZone.slice(
        4,
        10
      ) || '+0000'
    );
  }

  get traderTimezoneText() {
    // console.log(this.traderService.currentTrader.generalInformation.timeZone);

    return this.traderService.currentTrader.generalInformation.timeZone;
  }

  get traderTimezoneTitleAbbr(): string {
    return this.timezoneAbbr;
  }

  onScroll(): void {
    this.loadNextPage.emit(null);
    // console.log(this.tableData[2].timeStamp);
    var a = moment
      .tz(this.tableData[2].timeStamp, 'Asia/Singapore')
      .format('YYYY/MM/DD, HH:MM A');
    console.log(a);
    // console.log(moment.tz(this.tableData[1].timeStamp, 'Asia/Taipei'));
  }
}
