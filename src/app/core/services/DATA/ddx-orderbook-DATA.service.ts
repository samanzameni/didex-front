import { Injectable } from '@angular/core';
import { AbstractDATAService } from '@core/templates';
import { AuthService } from '@core/services';
import { PublicRESTService } from '@core/services/REST';
import {
  OrderBookResponse,
  PublicOrderFeed,
  OrderSide,
  OrderStatus,
} from '@core/models';
import { SignalRService } from '../ddx-signalr.service';

@Injectable()
export class OrderBookDATAService extends AbstractDATAService<
  OrderBookResponse
> {
  private currentSymbol: string;

  constructor(
    protected authService: AuthService,
    protected restService: PublicRESTService,
    protected signalrService: SignalRService
  ) {
    super(authService);

    this.queryEngine = this.restService.requestOrderBook.bind(restService);
  }

  updateFeed(symbol: string): void {
    if (symbol) {
      const methodName: string = 'on-order-' + symbol;

      if (this.currentSymbol !== symbol) {
        this.signalrService.removeDataListener(this.currentSymbol);
      }

      this.currentSymbol = symbol;
      this.signalrService.addDataListener(
        methodName,
        (feed: PublicOrderFeed) => {
          const currentData = this.dataStream$.value;
          if (currentData) {
            const arrayToUpdate =
              feed.side === OrderSide.Buy ? currentData.bid : currentData.ask;

            let tempIndex: number;
            const freshRecord = {
              id: feed.id,
              price: feed.price,
              volume: feed.quantity,
            };
            switch (feed.status) {
              case OrderStatus.New:
                arrayToUpdate.push(freshRecord);
                break;
              case OrderStatus.PartiallyFilled:
                tempIndex = -1;
                arrayToUpdate.forEach((record, index) => {
                  if (record.id === feed.id) {
                    tempIndex = index;
                    return;
                  }
                });

                if (tempIndex >= 0) {
                  // UPDATE
                  arrayToUpdate[tempIndex] = freshRecord;
                } else {
                  // ADD
                  arrayToUpdate.push(freshRecord);
                }
                break;
              case OrderStatus.Filled:
              case OrderStatus.Canceled:
                tempIndex = -1;
                arrayToUpdate.forEach((record, index) => {
                  if (record.id === feed.id) {
                    tempIndex = index;
                    return;
                  }
                });

                if (tempIndex >= 0) {
                  // DELETING
                  arrayToUpdate.splice(tempIndex, 1);
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
