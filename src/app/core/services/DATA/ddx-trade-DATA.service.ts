import { Injectable } from '@angular/core';
import { AbstractDATAService } from '@core/templates';
import { AuthService } from '@core/services';
import { Trade } from '@core/models';
import { PublicRESTService } from '../REST';
import { SignalRService } from '../ddx-signalr.service';

@Injectable()
export class TradeDATAService extends AbstractDATAService<Trade[]> {
  private currentSymbol: string;

  constructor(
    protected authService: AuthService,
    protected restService: PublicRESTService,
    protected signalrService: SignalRService
  ) {
    super(authService);

    this.queryEngine = this.restService.requestTrade.bind(restService);
  }

  public updateFeed(symbol: string): void {
    if (symbol) {
      if (this.currentSymbol !== symbol) {
        this.signalrService.removeDataListener(
          'on-trade-' + this.currentSymbol
        );
      }

      this.currentSymbol = symbol;
      this.signalrService.addDataListener(
        'on-trade-' + symbol,
        (feed: Trade) => {
          const currentValue: Trade[] = this.dataStream$.value;

          if (currentValue) {
            const newValue: Trade[] = Array.from(currentValue);
            if (newValue.length >= 100) {
              newValue.pop();
            }
            newValue.unshift(feed);

            this.dataStream$.next(newValue);
          }
        }
      );
    }
  }
}
