import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { BalanceDATAService } from '../DATA';

@Injectable()
export class BalanceINTERVALService {
  private shouldUpdate: boolean;
  private intervalUpdater: Observable<any>;

  constructor(private balanceDataService: BalanceDATAService) {
    this.shouldUpdate = false;
    this.intervalUpdater = interval(3000);
  }

  get flag(): boolean {
    return this.shouldUpdate;
  }

  setFlag(flag: boolean): void {
    this.shouldUpdate = flag;
  }

  startUpdater(): void {
    this.intervalUpdater.subscribe(i => {
      if (this.shouldUpdate) {
        this.balanceDataService.updateData();
        this.setFlag(false);
      }
    });
  }
}
