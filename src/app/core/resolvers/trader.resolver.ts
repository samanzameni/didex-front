import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { TraderService, AuthService } from '@core/services';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TraderResolver implements Resolve<any> {
  constructor(
    private traderService: TraderService,
    private authService: AuthService
  ) {}

  resolve() {
    return this.traderService.updateCurrentTrader().pipe(
      catchError(error => {
        if (error.status === 401 || error.status === 0) {
          this.authService.handleAuthError();
        }

        return of(null);
      })
    );
  }
}
