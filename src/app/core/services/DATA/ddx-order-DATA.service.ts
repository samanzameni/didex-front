import { Injectable } from '@angular/core';
import { AbstractDATAService } from '@core/templates';
import { AuthService } from '@core/services';
import { PublicRESTService } from '@core/services/REST';
import { OrderBookResponse } from '@core/models';

@Injectable()
export class OrderDATAService extends AbstractDATAService<OrderBookResponse> {
  constructor(
    protected authService: AuthService,
    protected restService: PublicRESTService
  ) {
    super(authService);

    this.queryEngine = this.restService.requestOrderBook.bind(restService);
  }
}
