import { Injectable } from '@angular/core';
import { AbstractDATAService } from '@core/templates';
import { AuthService } from '@core/services';
import { Order, OrderStatus } from '@core/models';
import { HistoryRESTService } from '../REST';
import { SignalRService } from '../ddx-signalr.service';
import { BalanceINTERVALService } from '../INTERVALS';

@Injectable()
export class FilledOrderDATAService extends AbstractDATAService<Order[]> {
  private currentSymbol: string;

  constructor(
    protected authService: AuthService,
    protected restService: HistoryRESTService,
    protected signalrService: SignalRService,
    protected balanceIntervalService: BalanceINTERVALService
  ) {
    super(authService);

    this.queryEngine = this.restService.requestListFilledOrders.bind(
      restService
    );

    this.balanceIntervalService.startUpdater();
    this.balanceIntervalService.setFlag(false);
  }

  public updateFeed(symbol: string): void {
    if (symbol) {
      if (this.currentSymbol !== symbol) {
        this.signalrService.removeDataListener(
          'on-private-order-' + this.currentSymbol
        );
      }

      this.currentSymbol = symbol;
      this.signalrService.addDataListener(
        'on-private-order-' + symbol,
        (feed: Order) => {
          const currentData = this.dataStream$.value;
          if (currentData) {
            switch (feed.status) {
              case OrderStatus.New:
              case OrderStatus.PartiallyFilled:
                break;
              case OrderStatus.Filled:
              case OrderStatus.Canceled:
                currentData.unshift(feed);
                break;
            }

            this.dataStream$.next(currentData);
            this.balanceIntervalService.setFlag(true);
          }
        }
      );
    }
  }
}
