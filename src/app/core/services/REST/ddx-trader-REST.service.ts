import { Injectable } from '@angular/core';
import { AbstractRESTService } from '@core/templates';
import { Observable } from 'rxjs';

@Injectable()
export class TraderRESTService extends AbstractRESTService {
  public requestUpdatePersonalInfo(data: any): Observable<any> {
    return this.httpPUT('api/Trader/PersonalInformation', data);
  }

  public requestSendConfirmationMobileNumber(data: any): Observable<any> {
    return this.httpPOST('api/Trader/SendConfirmationMobileNumber', data);
  }

  public requestUpdateMobileNumber(data: any): Observable<any> {
    return this.httpPUT('api/Trader/MobileNumber', data);
  }
}
