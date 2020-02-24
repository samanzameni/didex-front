import { Injectable } from '@angular/core';
import { AbstractDATAService } from '@core/templates';
import { AuthService } from '@core/services';
import { PublicRESTService } from '@core/services/REST';
import { TradeSymbol, TradeTicker, SymbolTickerData } from '@core/models';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SymbolDATAService extends AbstractDATAService<SymbolTickerData> {
  constructor(
    protected authService: AuthService,
    protected restService: PublicRESTService
  ) {
    super(authService);

    const symbol$: Observable<TradeSymbol[]> = restService.requestSymbol();
    const ticker$: Observable<TradeTicker[]> = restService.requestTicker();
    this.queryEngine = () =>
      combineLatest([symbol$, ticker$]).pipe(
        map(([symbol, ticker]) => ({ symbol, ticker }))
      );
  }
}
