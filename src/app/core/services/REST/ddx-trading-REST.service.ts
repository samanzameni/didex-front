import { Injectable } from '@angular/core';
import { AbstractRESTService } from '@core/templates';
import { StorageService } from '../ddx-storage.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TradeBalance } from '@core/models';

@Injectable()
export class TradingRESTService extends AbstractRESTService {
  constructor(
    protected storageService: StorageService,
    protected http: HttpClient
  ) {
    super(storageService, http);
  }

  public requestBalance(): Observable<TradeBalance[]> {
    return this.httpGET('api/Trading/Balance') as Observable<TradeBalance[]>;
  }
}
