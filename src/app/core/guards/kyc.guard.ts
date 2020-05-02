import { Injectable } from '@angular/core';
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { TraderService } from '@core/services';
import { catchError, map } from 'rxjs/operators';
import { Trader } from '@core/models';

@Injectable({
  providedIn: 'root',
})
export class KYCGuard implements CanActivateChild {
  constructor(private traderService: TraderService, private router: Router) {}

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const currentKYCPageURL: string = state.url.split('/').slice(-1)[0];
    let observableToSubscribe;
    if (
      currentKYCPageURL === 'identity-proof' ||
      currentKYCPageURL === 'selfie' ||
      currentKYCPageURL === 'done'
    ) {
      observableToSubscribe = forkJoin([
        this.traderService.updateCurrentTrader(),
        this.traderService.updateCurrentTraderKYCImages(),
      ]);
    } else {
      observableToSubscribe = this.traderService.updateCurrentTrader();
    }

    return observableToSubscribe.pipe(
      catchError((errorResponse) => {
        return of(null);
      }),
      map((response: Trader | Array<any> | null) => {
        if (!response) {
          return null;
        }

        let trader: Trader;
        if (Array.isArray(response)) {
          trader = response[0];
          trader.kycImages = response[1];
        } else {
          trader = response;
        }
        return trader;
      }),
      map((trader: Trader | null) => {
        if (!trader) {
          alert('In order to view this page, you have to be signed in.');
          return this.router.parseUrl('/auth/signin');
        }

        switch (currentKYCPageURL) {
          case 'personal-info':
            return true;
          case 'phone-verification':
            return !!trader.personalInformation
              ? true
              : this.router.parseUrl('/user/kyc/personal-info');
          case 'identity-proof':
            return !!trader.mobileNumber
              ? true
              : this.router.parseUrl('/user/kyc/phone-verification');
          case 'selfie':
            return !!trader.kycImages && trader.kycImages.length >= 1
              ? true
              : this.router.parseUrl('/user/kyc/identity-proof');
          case 'done':
            return !!trader.kycImages && trader.kycImages.length >= 2
              ? true
              : this.router.parseUrl('/user/kyc/selfie');
          default:
            return this.router.parseUrl('/user/kyc/personal-info');
        }
      })
    );
  }
}
