import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { AuthTokenData } from '@core/models/ddx-token-data.model';
import { Locale } from './ddx-locale.service';

@Injectable()
export class StorageService {
  constructor() {}

  public getUserAccessToken(): string {
    return localStorage.getItem('didexAccessToken');
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
