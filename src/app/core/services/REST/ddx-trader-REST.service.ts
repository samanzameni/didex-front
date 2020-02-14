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

  public requestUpdateIdentityImage(data: any): Observable<any> {
    return this.httpPUT(
      'api/Trader/KycImage',
      Object.assign(data, { imageType: 1 })
    );
  }

  public requestUpdateSelfieImage(data: any): Observable<any> {
    return this.httpPUT(
      'api/Trader/KycImage',
      Object.assign(data, { imageType: 2 })
    );
  }
}
