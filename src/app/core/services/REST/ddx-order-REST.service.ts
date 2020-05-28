import { Injectable } from '@angular/core';
import { AbstractRESTService } from '@core/templates';
import { Observable } from 'rxjs';
import { OrderData, Order } from '@core/models/ddx-order.model';

@Injectable()
export class OrderRESTService extends AbstractRESTService {
  public requestOrder(data: OrderData): Observable<Order> {
    return this.httpPOST('api/Order', data) as Observable<Order>;
  }

  public requestCancelOrder(orderID: string): Observable<any> {
    return this.httpDELETE(`api/Order/${orderID}`) as Observable<any>;
  }

  public requestListOrders(activeSymbol: string): Observable<Order[]> {
    return this.httpGET(`api/Order/${activeSymbol}?Desc=true`) as Observable<
      Order[]
    >;
  }
}
