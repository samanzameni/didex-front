import { Injectable } from '@angular/core';
import { AbstractDATAService } from '@core/templates';
import { AuthService } from '@core/services';
import { BankingRESTService } from '@core/services/REST';
import { Transaction } from '@core/models';

@Injectable()
export class TransactionsDATAService extends AbstractDATAService<
  Transaction[]
> {
  constructor(
    protected authService: AuthService,
    protected restService: BankingRESTService
  ) {
    super(authService);

    this.queryEngine = this.restService.requestTransactions.bind(restService);
  }
}
