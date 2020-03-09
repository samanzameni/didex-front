import { Injectable } from '@angular/core';
import { AbstractRESTService } from '@core/templates';
import { Observable } from 'rxjs';
import {
  Balance,
  BalanceWithdrawData,
  BalanceTransferData,
} from '@core/models';

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
}
