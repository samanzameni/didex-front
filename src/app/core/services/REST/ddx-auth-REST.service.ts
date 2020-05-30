import { Injectable } from '@angular/core';
import { AbstractRESTService } from '@core/templates';
import { StorageService } from '../ddx-storage.service';
import { HttpClient } from '@angular/common/http';
import {
  AuthFormData,
  AuthFormResponse,
  AuthResetPasswordFormData,
  AuthResetPasswordData,
  AuthEmailActivationData,
  NotificationContent,
  TwoFactorQRData,
  TwoFactorData,
  TwoFactorResponse,
} from '@core/models';
import { Observable } from 'rxjs';

@Injectable()
export class AuthRESTService extends AbstractRESTService {
  constructor(
    protected storageService: StorageService,
    protected http: HttpClient
  ) {
    super(storageService, http);
  }

  public requestRegister(data: AuthFormData): Observable<AuthFormResponse> {
    return this.httpPureRequest(
      `api/Account/register`,
      'POST',
      data
    ) as Observable<AuthFormResponse>;
  }

  public requestLogin(data: AuthFormData): Observable<AuthFormResponse> {
    return this.httpPureRequest(
      `api/Account/login`,
      'POST',
      data
    ) as Observable<AuthFormResponse>;
  }

  public requestResetPassword(
    data: AuthResetPasswordFormData
  ): Observable<any> {
    return this.httpPureRequest(
      `api/Account/requestResetPassword`,
      'POST',
      data
    ) as Observable<any>;
  }

  public requestNewPassword(data: AuthResetPasswordData): Observable<any> {
    return this.httpPureRequest(
      `api/Account/resetPassword`,
      'POST',
      data
    ) as Observable<any>;
  }

  public requestVerifyEmail(
    data: AuthEmailActivationData
  ): Observable<AuthFormResponse> {
    return this.httpPureRequest(
      `api/Account/verifyEmail`,
      'POST',
      data
    ) as Observable<AuthFormResponse>;
  }

  public requestChangePassword(data: any): Observable<any> {
    return this.httpPOST(`api/Account/changePassword`, data) as Observable<any>;
  }

  public requestNotifications(): Observable<NotificationContent[]> {
    return this.httpGET('api/Account/notification') as Observable<
      NotificationContent[]
    >;
  }

  public requestTwoFactorQRData(): Observable<TwoFactorQRData> {
    return this.httpGET('api/Account/manage/getTwoFactor') as Observable<
      TwoFactorQRData
    >;
  }

  public requestEnableTwoFactor(
    data: TwoFactorData
  ): Observable<TwoFactorResponse> {
    return this.httpPOST(
      'api/Account/manage/enableTwoFactor',
      data
    ) as Observable<TwoFactorResponse>;
  }

  public requestDisableTwoFactor(data: TwoFactorData): Observable<any> {
    return this.httpPOST(
      'api/Account/manage/removeTwoFactor',
      data
    ) as Observable<any>;
  }
}
