import { Injectable } from '@angular/core';
import { AbstractRESTService } from '@core/templates';
import { Observable } from 'rxjs';
import { Order } from '@core/models/ddx-order.model';
import { Trade } from '@core/models';
import { map } from 'rxjs/operators';
import { CONSTANTS } from '@core/util/constants';

@Injectable()
export class HistoryRESTService extends AbstractRESTService {
  public requestListFilledOrders(activeSymbol: string): Observable<Order[]> {
    const url = `api/History/orders${
      activeSymbol ? `/${activeSymbol}` : ''
    }?Limit=${CONSTANTS.PAGINATION_LIMIT_BIG}`;
    return this.httpGET(url).pipe(
      map((response) => response.records)
    ) as Observable<Order[]>;
  }

  public requestListPrivateTrades(activeSymbol: string): Observable<Trade[]> {
    const url = `api/History/trades${
      activeSymbol ? `/${activeSymbol}` : ''
    }?Limit=${CONSTANTS.PAGINATION_LIMIT_BIG}`;
    return this.httpGET(url).pipe(
      map((response) => response.records)
    ) as Observable<Trade[]>;
  }
}
