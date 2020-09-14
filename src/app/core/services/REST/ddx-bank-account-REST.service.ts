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

  public requestDeleteBankAccount(
    data: BankAccount.DeleteFormData
  ): Observable<any> {
    return this.httpDELETE(`api/Banking/bankAccount/${data.id}`) as Observable<
      any
    >;
  }

  public requestDepositFiat(
    data: BankAccount.DepositInitiateFormData
  ): Observable<BankAccount.DepositInitiateResponse> {
    return this.httpPOST(`api/Banking/initiate-deposit`, data) as Observable<
      BankAccount.DepositInitiateResponse
    >;
  }

  public requestDepositFiatVerify(
    data: BankAccount.DepositVerifyData
  ): Observable<any> {
    return this.httpPOST(`api/Banking/verify-deposit`, data) as Observable<any>;
  }

  public requestWithdrawFiat(
    data: BankAccount.WithdrawFormData
  ): Observable<any> {
    return this.httpPOST(
      'api/Banking/fiat-withdraw-request',
      data
    ) as Observable<any>;
  }
}
