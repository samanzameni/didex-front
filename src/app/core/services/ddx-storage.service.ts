import { Injectable } from '@angular/core';

import { AuthTokenData } from '@core/models/ddx-token-data.model';
import { TradeSymbol } from '@core/models/ddx-symbol.model';
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

  ///
  public getLastActivatedSymbol(): string {
    return localStorage.getItem('didexActiveSymbol');
  }

  public setLastActivatedSymbol(activeSymbolData: string): void {
    localStorage.setItem('didexActiveSymbol', activeSymbolData);
  }

  public clearStoredSymbol(): void {
    localStorage.removeItem('didexActiveSymbol');
  }

  //
  public getMarketType(): string {
    return localStorage.getItem('didexMarketType');
  }

  public setMarketType(marketType: string) {
    localStorage.setItem('didexMarketType', marketType);
  }
}
