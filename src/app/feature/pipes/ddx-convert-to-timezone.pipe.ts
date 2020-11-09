import { Pipe, PipeTransform } from '@angular/core';
import { TraderService } from '@core/services';
import * as moment from 'moment-timezone';

@Pipe({
  name: 'ddxConvertToTimezone',
})
export class ConvertToTimezonePipe implements PipeTransform {
  constructor(private traderService: TraderService) {}

  transform(timestamp: string): string {
    return moment
      .tz(timestamp, this.traderTimezoneText)
      .format('YYYY/MM/DD, HH:MM A');
  }

  get traderTimezoneText() {
    console.log(this.traderService.currentTrader.generalInformation.timeZone);
    return this.traderService.currentTrader.generalInformation.timeZone;
  }
}
