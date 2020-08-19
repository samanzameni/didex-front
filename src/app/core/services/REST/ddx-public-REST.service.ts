import { Injectable } from '@angular/core';
import { AbstractRESTService } from '@core/templates';
import { Observable } from 'rxjs';
import {
  TradeSymbol,
  Ticker,
  OrderBookResponse,
  Trade,
  Currency,
  SymbolExternalSource,
} from '@core/models';
import { CONSTANTS } from '@core/util/constants';

@Injectable()
export class PublicRESTService extends AbstractRESTService {
  public requestSymbol(): Observable<TradeSymbol[]> {
    return this.httpPublicGET('api/Public/Symbol') as Observable<TradeSymbol[]>;
  }

  public requestSymbolSources(): Observable<SymbolExternalSource[]> {
    return this.httpPublicGET('api/Public/Symbol/External') as Observable<
      SymbolExternalSource[]
    >;
  }

  public requestTicker(): Observable<Ticker[]> {
    return this.httpPublicGET('api/Public/Ticker') as Observable<Ticker[]>;
  }

  public requestOrderBook(activeSymbol: string): Observable<OrderBookResponse> {
    return this.httpPublicGET(
      `api/Public/OrderBook/${activeSymbol}`
    ) as Observable<OrderBookResponse>;
  }

  public requestCurrency(): Observable<Currency[]> {
    return this.httpPublicGET(`api/Public/Currency`) as Observable<Currency[]>;
  }

  public requestTrade(
    activeSymbol: string,
    options: any = {}
  ): Observable<Trade[]> {
    const offset =
      options && options.page !== undefined
        ? (options.page - 1) * CONSTANTS.PAGINATION_LIMIT
        : 0;
    return this.httpPublicGET(
      `api/Public/Trades/${activeSymbol}?Desc=true&Offset=${offset}&Limit=${CONSTANTS.PAGINATION_LIMIT}`
    ) as Observable<Trade[]>;
  }
}
