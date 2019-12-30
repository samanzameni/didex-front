import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { AuthTokenData } from '@core/models/ddx-token-data.model';

/**
 * StorageService handles all the things about reading from and
 * and writing on the local storage.
 *
 * @author Azad Kavian
 */
@Injectable()
export class StorageService {
  private accessTokenStream$: BehaviorSubject<string>;

  constructor() {
    this.accessTokenStream$ = new BehaviorSubject(
      localStorage.getItem('didexAccessToken') as string
    );
  }

  /**
   * Gets the access token stream.
   *
   */
  public getUserAccessToken(): BehaviorSubject<string> {
    return this.accessTokenStream$;
  }

  /**
   * Adds the given access token to the stream and stores
   * it in local storage.
   *
   */
  public setUserAccessToken(tokenData: AuthTokenData): void {
    localStorage.setItem('didexAccessToken', tokenData.didexAccessToken);
    this.accessTokenStream$.next(tokenData.didexAccessToken);
  }

  /**
   * Clears local storage from the tokens and sends an
   * 'undefined' value to the streams.
   *
   */
  public clearUserToken(): void {
    localStorage.removeItem('didexAccessToken');
    this.accessTokenStream$.next(undefined);
  }
}
