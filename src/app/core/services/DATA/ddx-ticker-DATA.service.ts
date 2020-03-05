import { Injectable } from '@angular/core';
import { AbstractDATAService } from '@core/templates';
import { AuthService } from '@core/services';
import { PublicRESTService } from '@core/services/REST';
import { TradeTicker } from '@core/models';

@Injectable()
export class TickerDATAService extends AbstractDATAService<TradeTicker[]> {
  constructor(
    protected authService: AuthService,
    protected restService: PublicRESTService
  ) {
    super(authService);

    this.queryEngine = this.restService.requestTicker.bind(restService);
  }
}
