import { Injectable } from '@angular/core';
import { AbstractRESTService } from '@core/templates';
import { StorageService } from '../ddx-storage.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Balance } from '@core/models';

@Injectable()
export class TradingRESTService extends AbstractRESTService {
  public requestBalance(): Observable<Balance[]> {
    return this.httpGET('api/Trading/Balance') as Observable<Balance[]>;
  }
}
