import { Injectable } from '@angular/core';
import { AbstractRESTService } from '@core/templates';
import { Observable } from 'rxjs';
import { Order } from '@core/models/ddx-order.model';
import { Trade } from '@core/models';
import { map } from 'rxjs/operators';
import { CONSTANTS } from '@core/util/constants';

@Injectable()
export class HistoryRESTService extends AbstractRESTService {
  public requestListFilledOrders(
    activeSymbol: string,
    options: any = {}
  ): Observable<Order[]> {
    const offset =
      options && options.page !== undefined
        ? (options.page - 1) * CONSTANTS.PAGINATION_LIMIT
        : 0;
    const url = `api/History/orders${
      activeSymbol ? `/${activeSymbol}` : ''
    }?Offset=${offset}&Limit=${CONSTANTS.PAGINATION_LIMIT}`;
    return this.httpGET(url).pipe(
      map((response) => response.records)
    ) as Observable<Order[]>;
  }

  public requestListPrivateTrades(
    activeSymbol: string,
    options: any = {}
  ): Observable<Trade[]> {
    const offset =
      options && options.page !== undefined
        ? (options.page - 1) * CONSTANTS.PAGINATION_LIMIT
        : 0;
    const url = `api/History/trades${
      activeSymbol ? `/${activeSymbol}` : ''
    }?Offset=${offset}&Limit=${CONSTANTS.PAGINATION_LIMIT}`;
    return this.httpGET(url).pipe(
      map((response) => response.records)
    ) as Observable<Trade[]>;
  }
}
