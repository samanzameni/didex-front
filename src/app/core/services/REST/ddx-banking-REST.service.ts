import { Injectable } from '@angular/core';
import { AbstractRESTService } from '@core/templates';
import { Observable } from 'rxjs';
import {
  Balance,
  BalanceWithdrawData,
  BalanceTransferData,
  Transaction,
  WalletAddressData,
  WalletAddress,
  BalanceWithdrawConfirmData,
} from '@core/models';
import { map } from 'rxjs/operators';
import { CONSTANTS } from '@core/util/constants';

@Injectable()
export class BankingRESTService extends AbstractRESTService {
  public requestBalance(): Observable<Balance[]> {
    return this.httpGET('api/Banking/balance') as Observable<Balance[]>;
  }

  public requestWithdraw(data: BalanceWithdrawData): Observable<any> {
    return this.httpPOST('api/Banking/withdraw-request', data) as Observable<
      any
    >;
  }

  public requestWithdrawConfirm(
    data: BalanceWithdrawConfirmData
  ): Observable<any> {
    const url = `api/Banking/withdraw?requestId=${data.requestId}&token=${data.token}`;
    return this.httpGET(url) as Observable<any>;
  }

  public requestTransfer(data: BalanceTransferData): Observable<any> {
    return this.httpPOST('api/Banking/transfer', data) as Observable<any>;
  }
  public requestWalletAddress(
    data: WalletAddressData
  ): Observable<WalletAddress> {
    return this.httpPOST('api/Banking/getWallet', data) as Observable<
      WalletAddress
    >;
  }

  public requestTransactions(): Observable<Transaction[]> {
    return this.httpGET(
      `api/Banking/transactions?Desc=true&Limit=${CONSTANTS.PAGINATION_LIMIT_BIG}`
    ).pipe(map((response) => response.records)) as Observable<Transaction[]>;
  }
}
