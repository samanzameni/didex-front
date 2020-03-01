import { Injectable } from '@angular/core';
import { AuthService } from './ddx-auth.service';
import { Trader, TraderStatus } from '@core/models';

@Injectable()
export class TraderService {
  private trader: Trader;

  constructor(private authService: AuthService) {}

  get currentTrader(): Trader {
    return this.trader;
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

  get hasKYCFilled(): boolean {
    return (
      !!this.trader &&
      !!this.trader.kycImages &&
      this.trader.kycImages.length > 0 &&
      !!this.trader.mobileNumber &&
      !!this.trader.personalInformation
    );
  }
}
