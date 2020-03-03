import { Injectable } from '@angular/core';
import { AbstractRESTService } from '@core/templates';
import { Observable } from 'rxjs';
import { OrderData, TradeOrder } from '@core/models/ddx-order.model';

@Injectable()
export class OrderRESTService extends AbstractRESTService {
  public requestOrder(data: OrderData): Observable<any> {
    return this.httpPOST('api/Order', data) as Observable<any>;
  }

  public requestListOrders(): Observable<TradeOrder[]> {
    return this.httpGET('api/Order') as Observable<TradeOrder[]>;
  }
}
