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
import Decimal from 'decimal.js';

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
      if (this.currentSymbol !== symbol) {
        this.signalrService.removeDataListener(
          'on-order-' + this.currentSymbol
        );
      }

      this.currentSymbol = symbol;
      this.signalrService.addDataListener(
        'on-order-' + symbol,
        (feed: PublicOrderFeed) => {
          const currentData = this.dataStream$.value;
          if (currentData) {
            const arrayToUpdate =
              feed.side === OrderSide.Buy ? currentData.bid : currentData.ask;

            let index: number;
            const freshRecord = {
              id: feed.id,
              price: feed.price,
              volume: feed.quantity,
            };
            switch (feed.status) {
              case OrderStatus.New:
                // checking if order with this price already exists or not
                index = -1;
                arrayToUpdate.forEach((record, i) => {
                  if (record.price === freshRecord.price) {
                    index = i;
                    return;
                  }
                });

                if (index > -1) {
                  // UPDATE
                  arrayToUpdate[index].volume = new Decimal(
                    arrayToUpdate[index].volume
                  )
                    .add(freshRecord.volume)
                    .toNumber();
                } else {
                  // ADD
                  arrayToUpdate.push(freshRecord);
                }
                break;
              case OrderStatus.PartiallyFilled:
                // checking if order with this price already exists or not
                index = -1;
                arrayToUpdate.forEach((record, i) => {
                  if (record.price === freshRecord.price) {
                    index = i;
                    return;
                  }
                });

                if (index >= 0) {
                  // UPDATE
                  arrayToUpdate[index] = freshRecord;
                } else {
                  // ADD
                  arrayToUpdate.push(freshRecord);
                }
                break;
              case OrderStatus.Filled:
              case OrderStatus.Canceled:
                // checking if order with this price already exists or not
                index = -1;
                arrayToUpdate.forEach((record, i) => {
                  if (record.price === freshRecord.price) {
                    index = i;
                    return;
                  }
                });

                if (index >= 0) {
                  if (arrayToUpdate[index].volume <= freshRecord.volume) {
                    // DELETE
                    arrayToUpdate.splice(index, 1);
                  } else {
                    // UPDATE
                    arrayToUpdate[index].volume = new Decimal(
                      arrayToUpdate[index].volume
                    )
                      .minus(freshRecord.volume)
                      .toNumber();
                  }
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
