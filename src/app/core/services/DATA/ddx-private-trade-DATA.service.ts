import { Injectable } from '@angular/core';
import { AbstractDATAService } from '@core/templates';
import { AuthService } from '@core/services';
import { Trade } from '@core/models';
import { HistoryRESTService } from '../REST';
import { SignalRService } from '../ddx-signalr.service';
import { BalanceINTERVALService } from '../INTERVALS';

@Injectable()
export class PrivateTradeDATAService extends AbstractDATAService<Trade[]> {
  private currentSymbol: string;

  constructor(
    protected authService: AuthService,
    protected restService: HistoryRESTService,
    protected signalrService: SignalRService,
    protected balanceIntervalService: BalanceINTERVALService
  ) {
    super(authService);

    this.queryEngine = this.restService.requestListPrivateTrades.bind(
      restService
    );
    this.balanceIntervalService.startUpdater();
    this.balanceIntervalService.setFlag(false);
  }

  public updateFeed(symbol: string): void {
    if (symbol) {
      if (this.currentSymbol !== symbol) {
        this.signalrService.removeDataListener(
          'on-private-trade-' + this.currentSymbol
        );
      }

      this.currentSymbol = symbol;
      this.signalrService.addDataListener(
        'on-private-trade-' + symbol,
        (feed: Trade) => {
          if (feed.timeStamp.endsWith('Z')) {
            feed.timeStamp = feed.timeStamp.slice(0, feed.timeStamp.length - 1);
          }
          const currentValue: Trade[] = this.dataStream$.value;

          if (currentValue) {
            const newValue: Trade[] = Array.from(currentValue);
            newValue.unshift(feed);

            this.dataStream$.next(newValue);
            this.balanceIntervalService.setFlag(true);
          }
        }
      );
    }
  }
}
