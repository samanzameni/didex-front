import { Injectable } from '@angular/core';
import { AbstractDATAService } from '@core/templates';
import { AuthService } from '@core/services';
import { PublicRESTService } from '@core/services/REST';
import { TradeSymbol } from '@core/models';

@Injectable()
export class SymbolDATAService extends AbstractDATAService<TradeSymbol[]> {
  constructor(
    protected authService: AuthService,
    protected restService: PublicRESTService
  ) {
    super(authService);

    this.queryEngine = this.restService.requestSymbol.bind(restService);
  }
}
