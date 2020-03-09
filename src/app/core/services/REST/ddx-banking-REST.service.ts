import { Injectable } from '@angular/core';
import { AbstractRESTService } from '@core/templates';
import { Observable } from 'rxjs';
import {
  Balance,
  BalanceWithdrawData,
  BalanceTransferData,
  Transaction,
} from '@core/models';
import { map } from 'rxjs/operators';

@Injectable()
export class BankingRESTService extends AbstractRESTService {
  public requestBalance(): Observable<Balance[]> {
    return this.httpGET('api/Banking/balance') as Observable<Balance[]>;
  }

  public requestWithdraw(data: BalanceWithdrawData): Observable<any> {
    return this.httpPOST('api/Banking/withdraw', data) as Observable<any>;
  }

  public requestTransfer(data: BalanceTransferData): Observable<any> {
    return this.httpPOST('api/Banking/transfer', data) as Observable<any>;
  }

  public requestTransactions(): Observable<Transaction[]> {
    return this.httpGET('api/Banking/transactions?Desc=true').pipe(
      map(response => response.records)
    ) as Observable<Transaction[]>;
  }
}
