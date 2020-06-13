import { Injectable } from '@angular/core';
import { AbstractRESTService } from '@core/templates';
import { Observable } from 'rxjs';
import { OrderData, Order } from '@core/models/ddx-order.model';
import { CONSTANTS } from '@core/util/constants';

@Injectable()
export class OrderRESTService extends AbstractRESTService {
  public requestOrder(data: OrderData): Observable<Order> {
    return this.httpPOST('api/Order', data) as Observable<Order>;
  }

  public requestCancelOrder(orderID: string): Observable<any> {
    return this.httpDELETE(`api/Order/${orderID}`) as Observable<any>;
  }

  public requestListOrders(
    activeSymbol: string,
    options: any = {}
  ): Observable<Order[]> {
    const offset =
      options && options.page !== undefined
        ? (options.page - 1) * CONSTANTS.PAGINATION_LIMIT
        : 0;
    return this.httpGET(
      `api/Order/${activeSymbol}?Desc=true&Offset=${offset}&Limit=${CONSTANTS.PAGINATION_LIMIT}`
    ) as Observable<Order[]>;
  }
}
