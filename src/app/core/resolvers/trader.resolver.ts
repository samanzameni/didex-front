import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { TraderService, AuthService } from '@core/services';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TraderResolver implements Resolve<any> {
  constructor(
    private traderService: TraderService,
    private authService: AuthService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    if (!this.traderService.currentTrader) {
      return this.traderService.updateCurrentTrader().pipe(
        catchError((error) => {
          if (error.status === 401) {
            if (!route.url || route.url.length === 0) {
              // We're in homepage;
            } else {
              this.authService.handleAuthError();
            }
          }

          return of(null);
        })
      );
    }
  }
}
