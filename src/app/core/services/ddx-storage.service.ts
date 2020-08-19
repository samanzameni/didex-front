import { Injectable } from '@angular/core';

import { AuthTokenData } from '@core/models/ddx-token-data.model';
import { Locale } from './ddx-locale.service';
import { environment } from '@environments/environment';
import { CONSTANTS } from '@core/util/constants';

@Injectable()
export class StorageService {
  constructor() {}

  public getUserAccessToken(): string {
    return !environment.production && window.location.hostname === 'localhost'
      ? CONSTANTS.DEV_ACCESS_TOKEN
      : localStorage.getItem('didexAccessToken');
  }

  public setUserAccessToken(tokenData: AuthTokenData): void {
    localStorage.setItem('didexAccessToken', tokenData.didexAccessToken);
  }

  public clearUserToken(): void {
    localStorage.removeItem('didexAccessToken');
  }

  ///
  public getStoredLocale(): Locale {
    return localStorage.getItem('didexLocale') as Locale;
  }

  public setStoredLocale(localeData: Locale): void {
    localStorage.setItem('didexLocale', localeData);
  }

  public clearStoredLocale(): void {
    localStorage.removeItem('didexLocale');
  }
}
