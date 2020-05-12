import { Injectable } from '@angular/core';
import { AuthRESTService } from './REST';
import {
  AuthFormData,
  AuthFormResponse,
  AuthResetPasswordFormData,
  AuthEmailActivationData,
  AuthResetPasswordData,
  NotificationContent,
} from '@core/models';
import { StorageService } from './ddx-storage.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SignalRService } from './ddx-signalr.service';
import * as jwtDecode from 'jwt-decode';
import { TraderService } from './ddx-trader.service';

@Injectable()
export class AuthService {
  private isUserAuthorized: boolean;
  private notifications: NotificationContent[];

  constructor(
    private restService: AuthRESTService,
    private storageService: StorageService,
    private signalrService: SignalRService,
    private router: Router,
    private traderService: TraderService
  ) {
    this.isUserAuthorized = !!this.storageService.getUserAccessToken();
  }

  get isAuthorized(): boolean {
    return this.isUserAuthorized;
  }

  get accountNotifications(): NotificationContent[] {
    return this.notifications || [];
  }

  get decodedToken(): any {
    return this.isUserAuthorized
      ? jwtDecode(this.storageService.getUserAccessToken())
      : {};
  }

  public requestGetNotifications(): Observable<NotificationContent[]> {
    return this.restService.requestNotifications().pipe(
      tap((response) => {
        this.notifications = response;
      })
    );
  }

  public requestSignUp(formData: AuthFormData): Observable<AuthFormResponse> {
    return this.restService.requestRegister(formData);
  }

  public requestNewPassword(formData: AuthResetPasswordData): Observable<any> {
    return this.restService.requestNewPassword(formData);
  }

  public requestSignIn(formData: AuthFormData): Observable<AuthFormResponse> {
    return this.restService.requestLogin(formData).pipe(
      tap((response) => {
        this.storageService.setUserAccessToken({
          didexAccessToken: response.token,
        });
        this.isUserAuthorized = true;
        this.signalrService.resetConnection();
      })
    );
  }

  public requestVerifyEmail(
    data: AuthEmailActivationData
  ): Observable<AuthFormResponse> {
    return this.restService.requestVerifyEmail(data).pipe(
      tap((response) => {
        this.storageService.setUserAccessToken({
          didexAccessToken: response.token,
        });
        this.isUserAuthorized = true;
        this.signalrService.resetConnection();
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
    this.signalrService.resetConnection();
    this.traderService.removeCurrentTrader();
    this.traderService.removeCurrentTraderImages();
    this.router.navigateByUrl('/');
  }

  public handleAuthError(): void {
    alert(
      'Your token is expired or is not valid. You will get redirected to the sign in page.'
    );
    this.storageService.clearUserToken();
    this.isUserAuthorized = false;
    this.signalrService.resetConnection();
    this.traderService.removeCurrentTrader();
    this.traderService.removeCurrentTraderImages();
    this.router.navigateByUrl(
      this.router.parseUrl(
        '/external-redirect?redirect_url=/auth/signin&from=/trade'
      )
    );
  }
}
