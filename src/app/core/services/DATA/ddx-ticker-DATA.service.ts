import { Injectable } from '@angular/core';
import { AbstractDATAService } from '@core/templates';
import { AuthService } from '@core/services';
import { PublicRESTService } from '@core/services/REST';
import { TradeTicker } from '@core/models';
import { SignalRService } from '../ddx-signalr.service';

@Injectable()
export class TickerDATAService extends AbstractDATAService<TradeTicker[]> {
  constructor(
    protected authService: AuthService,
    protected restService: PublicRESTService,
    protected signalrService: SignalRService
  ) {
    super(authService);

    this.queryEngine = this.restService.requestTicker.bind(restService);
  }

  public updateFeed(): void {
    this.signalrService.removeDataListener('on-ticker');
    this.signalrService.addDataListener('on-ticker', (feed: TradeTicker) => {
      const currentValue: TradeTicker[] = this.dataStream$.value;
      const newValue: TradeTicker[] = Array.from(currentValue);

      if (newValue && newValue.length > 0) {
        newValue.forEach((ticker, index) => {
          if (ticker.symbol === feed.symbol) {
            if (!this.areSameTickers(ticker, feed)) {
              newValue[index] = feed;
              this.dataStream$.next(newValue);
              return;
            }
          }
        });
      }
    });
  }

  private areSameTickers(a: TradeTicker, b: TradeTicker): boolean {
    if (!!a) {
      if (!b) {
        return false;
      }

      for (const key of Object.keys(a)) {
        if (a[key] !== b[key]) {
          return false;
        }
      }

      return true;
    }

    return !b;
  }
}
