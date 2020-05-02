import { Injectable } from '@angular/core';
import { AbstractRESTService } from '@core/templates';
import { Observable } from 'rxjs';
import { Trader } from '@core/models';

@Injectable()
export class TraderRESTService extends AbstractRESTService {
  public requestGetTraderInfo(): Observable<Trader> {
    return this.httpGET('api/Trader') as Observable<Trader>;
  }

  public requestUpdatePersonalInfo(data: any): Observable<any> {
    return this.httpPUT('api/Trader/PersonalInformation', data);
  }

  public requestSendConfirmationMobileNumber(data: any): Observable<any> {
    return this.httpPOST('api/Trader/SendConfirmationMobileNumber', data);
  }

  public requestUpdateMobileNumber(data: any): Observable<any> {
    return this.httpPUT('api/Trader/MobileNumber', data);
  }

  public requestKYCImages(): Observable<any> {
    return this.httpGET('api/Trader/KycImage');
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

  public requestKYCApproval(): Observable<any> {
    return this.httpGET('api/Trader/RequestApproval');
  }

  public requestUpdateGeneralInformation(data: any): Observable<any> {
    return this.httpPUT('api/Trader/GeneralSettings', data);
  }
}
