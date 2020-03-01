import { Injectable } from '@angular/core';
import { AuthRESTService } from './REST';
import {
  AuthFormData,
  AuthFormResponse,
  AuthResetPasswordFormData,
} from '@core/models';
import { StorageService } from './ddx-storage.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private isUserAuthorized: boolean;

  constructor(
    private restService: AuthRESTService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.isUserAuthorized = !!this.storageService.getUserAccessToken();
  }

  get isAuthorized(): boolean {
    return this.isUserAuthorized;
  }

  public requestSignUp(formData: AuthFormData): Observable<AuthFormResponse> {
    return this.restService.requestRegister(formData).pipe(
      tap(response => {
        this.storageService.setUserAccessToken({
          didexAccessToken: response.token,
        });
        this.isUserAuthorized = true;
      })
    );
  }

  public requestSignIn(formData: AuthFormData): Observable<AuthFormResponse> {
    return this.restService.requestLogin(formData).pipe(
      tap(response => {
        this.storageService.setUserAccessToken({
          didexAccessToken: response.token,
        });
        this.isUserAuthorized = true;
      })
    );
  }

  public requestResetPassword(
    formData: AuthResetPasswordFormData
  ): Observable<any> {
    return this.restService.requestResetPassword(formData);
  }

  public requestSignOut(): void {
    this.storageService.clearUserToken();
    this.isUserAuthorized = false;
    this.router.navigateByUrl('/');
  }

  public handleAuthError(): void {
    this.storageService.clearUserToken();
    this.isUserAuthorized = false;
    this.router.navigateByUrl('/auth/signin');
  }
}
