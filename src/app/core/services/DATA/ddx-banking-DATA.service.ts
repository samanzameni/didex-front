import { Injectable } from '@angular/core';
import { AbstractDATAService } from '@core/templates';
import { AuthService } from '@core/services';
import { BankingRESTService } from '@core/services/REST';
import { Balance } from '@core/models';

@Injectable()
export class BankingDATAService extends AbstractDATAService<Balance[]> {
  constructor(
    protected authService: AuthService,
    protected restService: BankingRESTService
  ) {
    super(authService);

    this.queryEngine = this.restService.requestBalance.bind(restService);
  }
}
