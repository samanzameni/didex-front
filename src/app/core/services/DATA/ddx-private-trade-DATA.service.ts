import { Injectable } from '@angular/core';
import { AbstractDATAService } from '@core/templates';
import { AuthService } from '@core/services';
import { Trade } from '@core/models';
import { HistoryRESTService } from '../REST';
import { SignalRService } from '../ddx-signalr.service';

@Injectable()
export class PrivateTradeDATAService extends AbstractDATAService<Trade[]> {
  private currentSymbol: string;

  constructor(
    protected authService: AuthService,
    protected restService: HistoryRESTService,
    protected signalrService: SignalRService
  ) {
    super(authService);

    this.queryEngine = this.restService.requestListPrivateTrades.bind(
      restService
    );
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
          const currentValue: Trade[] = this.dataStream$.value;

          if (currentValue) {
            const newValue: Trade[] = Array.from(currentValue);
            newValue.unshift(feed);

            this.dataStream$.next(newValue);
          }
        }
      );
    }
  }
}
