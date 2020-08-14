import { Injectable } from '@angular/core';
import { AbstractDATAService } from '@core/templates';
import { AuthService } from '@core/services';
import { BankAccountRESTService } from '@core/services/REST';
import { BankAccount } from '@core/models';

@Injectable()
export class BankAccountDATAService extends AbstractDATAService<
  BankAccount.Model[]
> {
  constructor(
    protected authService: AuthService,
    protected restService: BankAccountRESTService
  ) {
    super(authService);

    this.queryEngine = this.restService.requestListBankAccounts.bind(
      restService
    );
  }
}
