import { Injectable } from '@angular/core';
import { AbstractRESTService } from '@core/templates';
import { Observable } from 'rxjs';
import { BankAccount } from '@core/models';

@Injectable()
export class BankAccountRESTService extends AbstractRESTService {
  public requestListBankAccounts(): Observable<BankAccount.Model[]> {
    return this.httpGET(`api/Banking/bankAccount`) as Observable<
      BankAccount.Model[]
    >;
  }

  public requestAddBankAccount(
    data: BankAccount.AddFormData
  ): Observable<BankAccount.Model> {
    return this.httpPOST(`api/Banking/bankAccount`, data) as Observable<
      BankAccount.Model
    >;
  }

  public requestDepositFiat(
    data: BankAccount.DepositInitiateFormData
  ): Observable<BankAccount.DepositInitiateResponse> {
    return this.httpPOST(`api/Banking/initiate-deposit`, data) as Observable<
      BankAccount.DepositInitiateResponse
    >;
  }
}
