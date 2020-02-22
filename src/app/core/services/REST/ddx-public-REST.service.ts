import { Injectable } from '@angular/core';
import { AbstractRESTService } from '@core/templates';
import { Observable } from 'rxjs';
import { TradeSymbol } from '@core/models';

@Injectable()
export class PublicRESTService extends AbstractRESTService {
  public requestSymbol(): Observable<TradeSymbol[]> {
    return this.httpPureRequest('api/Public/Symbol', 'GET') as Observable<
      TradeSymbol[]
    >;
  }
}
