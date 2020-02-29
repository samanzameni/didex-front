import { Injectable } from '@angular/core';
import { AbstractDATAService } from '@core/templates';
import { AuthService } from '@core/services';
import { TradingRESTService } from '@core/services/REST';
import { TradeBalance } from '@core/models';

@Injectable()
export class BalanceDATAService extends AbstractDATAService<TradeBalance[]> {
  constructor(
    protected authService: AuthService,
    protected restService: TradingRESTService
  ) {
    super(authService);

    this.queryEngine = this.restService.requestBalance.bind(restService);
  }
}
