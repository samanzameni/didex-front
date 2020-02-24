import { Component, OnInit, Input } from '@angular/core';
import { TradeSymbol, TradeBalance } from '@core/models';
import { BalanceDATAService } from '@core/services/DATA';

@Component({
  selector: 'ddx-market',
  templateUrl: './ddx-market.component.html',
  styleUrls: ['./ddx-market.component.scss'],
})
export class MarketComponent implements OnInit {
  @Input() activeSymbol: TradeSymbol;

  private currentActiveType: string;
  private balanceData: TradeBalance[];

  constructor(private dataService: BalanceDATAService) {
    this.currentActiveType = 'market';
  }

  ngOnInit() {
    this.dataService.updateData();
    this.dataService.dataStream$.subscribe(data => {
      this.balanceData = data || [];
    });
  }

  get activeType(): string {
    return this.currentActiveType;
  }

  get baseBalanceData(): TradeBalance {
    if (!this.activateType || !this.balanceData) {
      return null;
    }

    for (const item of this.balanceData) {
      if (item.currency === this.activeSymbol.baseCurrencyShortName) {
        return item;
      }
    }

    return null;
  }

  get quoteBalanceData(): TradeBalance {
    if (!this.activateType || !this.balanceData) {
      return null;
    }

    for (const item of this.balanceData) {
      if (item.currency === this.activeSymbol.quoteCurrencyShortName) {
        return item;
      }
    }

    return null;
  }

  activateType(newType: string): void {
    this.currentActiveType = newType;
  }

  onSubmitBuy(): void {}
  onSubmitSell(): void {}
}
