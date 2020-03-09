import { Injectable } from '@angular/core';
import { AbstractRESTService } from '@core/templates';
import { Observable } from 'rxjs';
import {
  TradeSymbol,
  Ticker,
  OrderBookResponse,
  Trade,
  Currency,
} from '@core/models';

@Injectable()
export class PublicRESTService extends AbstractRESTService {
  public requestSymbol(): Observable<TradeSymbol[]> {
    return this.httpPureRequest('api/Public/Symbol', 'GET') as Observable<
      TradeSymbol[]
    >;
  }

  public requestTicker(): Observable<Ticker[]> {
    return this.httpPureRequest('api/Public/Ticker', 'GET') as Observable<
      Ticker[]
    >;
  }

  public requestOrderBook(activeSymbol: string): Observable<OrderBookResponse> {
    return this.httpPureRequest(
      `api/Public/OrderBook/${activeSymbol}`,
      'GET'
    ) as Observable<OrderBookResponse>;
  }

  public requestCurrency(): Observable<Currency[]> {
    return this.httpPureRequest(`api/Public/Currency`, 'GET') as Observable<
      Currency[]
    >;
  }

  public requestTrade(activeSymbol: string): Observable<Trade[]> {
    return this.httpPureRequest(
      `api/Public/Trades/${activeSymbol}?Desc=true&Limit=100`,
      'GET'
    ) as Observable<any>;
  }
}
