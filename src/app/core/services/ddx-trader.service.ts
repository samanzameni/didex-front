import { Injectable } from '@angular/core';
import { Trader, TraderStatus, TraderKycImage } from '@core/models';
import { Observable } from 'rxjs';
import { TraderRESTService } from './REST';
import { tap } from 'rxjs/operators';

@Injectable()
export class TraderService {
  private trader: Trader;
  private traderKYCImages: TraderKycImage[];

  private traderStatusItems: any[];

  constructor(private restService: TraderRESTService) {
    // Extracting traderstatus items from enum
    const traderStatusKeys = Object.keys(TraderStatus);
    const traderStatusNames = traderStatusKeys.slice(
      traderStatusKeys.length / 2
    );

    this.traderStatusItems = traderStatusNames.map((name) => {
      return {
        title: name
          .split(/\s|_|(?=[A-Z])/)
          .join('_')
          .toLowerCase(),
        value: TraderStatus[name],
      };
    });
  }

  get traderStatusEnumItems(): any[] {
    return this.traderStatusItems;
  }

  get currentTrader(): Trader {
    return this.trader;
  }

  get currentTraderKYCImages(): TraderKycImage[] {
    return this.traderKYCImages;
  }

  get isNewbie(): boolean {
    return !!this.trader && this.trader.status === TraderStatus.Newbie;
  }

  get hasSentKYC(): boolean {
    return !!this.trader && this.trader.status === TraderStatus.KycSent;
  }

  get hasKYCApproved(): boolean {
    return !!this.trader && this.trader.status === TraderStatus.Approved;
  }

  get isBanned(): boolean {
    return !!this.trader && this.trader.status === TraderStatus.Banned;
  }

  get isRejected(): boolean {
    return !!this.trader && this.trader.status === TraderStatus.Rejected;
  }

  get hasKYCFilled(): boolean {
    return (
      !!this.trader &&
      !!this.trader.personalInformation &&
      !!this.trader.mobileNumber &&
      !!this.trader.kycImages &&
      this.trader.kycImages.length > 0
    );
  }

  public updateCurrentTrader(): Observable<Trader> {
    return this.restService.requestGetTraderInfo().pipe(
      tap((trader) => {
        this.trader = trader;
      })
    );
  }

  public removeCurrentTrader(): void {
    this.trader = null;
  }

  public removeCurrentTraderImages(): void {
    this.traderKYCImages = null;
  }

  public updateCurrentTraderKYCImages(): Observable<any> {
    return this.restService.requestKYCImages().pipe(
      tap((images) => {
        this.traderKYCImages = images;
      })
    );
  }
}
