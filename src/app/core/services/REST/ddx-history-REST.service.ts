import { Injectable } from '@angular/core';
import { AbstractRESTService } from '@core/templates';
import { Observable } from 'rxjs';
import { Order } from '@core/models/ddx-order.model';
import { Trade } from '@core/models';

@Injectable()
export class HistoryRESTService extends AbstractRESTService {
  public requestListFilledOrders(activeSymbol: string): Observable<Order[]> {
    return this.httpGET(`api/History/orders/${activeSymbol}`) as Observable<
      Order[]
    >;
  }

  public requestListPrivateTrades(activeSymbol: string): Observable<Trade[]> {
    return this.httpGET(`api/History/trades/${activeSymbol}`) as Observable<
      Trade[]
    >;
  }
}
