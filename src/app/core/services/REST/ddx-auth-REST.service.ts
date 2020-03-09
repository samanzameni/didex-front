import { Injectable } from '@angular/core';
import { AbstractRESTService } from '@core/templates';
import { StorageService } from '../ddx-storage.service';
import { HttpClient } from '@angular/common/http';
import {
  AuthFormData,
  AuthFormResponse,
  AuthResetPasswordFormData,
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

  public requestNewPassword(data: AuthResetPasswordFormData): Observable<any> {
    return this.httpPureRequest(
      `api/Account/resetPassword`,
      'POST',
      data
    ) as Observable<any>;
  }

  public requestChangePassword(data: any): Observable<any> {
    return this.httpPOST(`api/Account/changePassword`, data) as Observable<any>;
  }
}
