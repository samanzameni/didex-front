import { Injectable } from '@angular/core';
import { AbstractDATAService } from '@core/templates';
import { AuthService } from '@core/services';
import { PublicRESTService } from '@core/services/REST';
import { TradeOrder } from '@core/models';

@Injectable()
export class OrderDATAService extends AbstractDATAService<TradeOrder[]> {
  constructor(
    protected authService: AuthService,
    protected restService: PublicRESTService
  ) {
    super(authService);

    this.queryEngine = this.restService.requestOrder.bind(restService);
  }
}
