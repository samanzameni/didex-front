import { Injectable } from '@angular/core';
import { AbstractDATAService } from '@core/templates';
import { AuthService } from '@core/services';
import { OrderRESTService } from '@core/services/REST';
import { Order, OrderSide, OrderStatus } from '@core/models';
import { SignalRService } from '../ddx-signalr.service';

@Injectable()
export class OrderDATAService extends AbstractDATAService<Order[]> {
  private currentSymbol: string;

  constructor(
    protected authService: AuthService,
    protected restService: OrderRESTService,
    protected signalrService: SignalRService
  ) {
    super(authService);

    this.queryEngine = this.restService.requestListOrders.bind(restService);
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
            let tempIndex: number;
            switch (feed.status) {
              case OrderStatus.New:
                currentData.unshift(feed);
                break;
              case OrderStatus.PartiallyFilled:
                tempIndex = -1;
                currentData.forEach((record, index) => {
                  if (record.id === feed.id) {
                    tempIndex = index;
                    return;
                  }
                });

                if (tempIndex >= 0) {
                  // UPDATE
                  currentData[tempIndex] = feed;
                } else {
                  // ADD
                  currentData.unshift(feed);
                }
                break;
              case OrderStatus.Filled:
              case OrderStatus.Canceled:
                tempIndex = -1;
                currentData.forEach((record, index) => {
                  if (record.id === feed.id) {
                    tempIndex = index;
                    return;
                  }
                });

                if (tempIndex >= 0) {
                  // DELETING
                  currentData.splice(tempIndex, 1);
                }
                break;
            }

            this.dataStream$.next(currentData);
          }
        }
      );
    }
  }
}
