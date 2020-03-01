import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { AuthTokenData } from '@core/models/ddx-token-data.model';

@Injectable()
export class StorageService {
  constructor() {}

  /**
   * Gets the access token stream.
   *
   */
  public getUserAccessToken(): string {
    return localStorage.getItem('didexAccessToken');
  }

  /**
   * Adds the given access token to the stream and stores
   * it in local storage.
   *
   */
  public setUserAccessToken(tokenData: AuthTokenData): void {
    localStorage.setItem('didexAccessToken', tokenData.didexAccessToken);
  }

  /**
   * Clears local storage from the tokens and sends an
   * 'undefined' value to the streams.
   *
   */
  public clearUserToken(): void {
    localStorage.removeItem('didexAccessToken');
  }
}
