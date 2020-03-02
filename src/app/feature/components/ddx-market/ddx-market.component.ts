import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { TradeSymbol, TradeBalance, TradeTicker } from '@core/models';
import { getTickerFromSymbol } from '@core/util/ticker';

import { Decimal } from 'decimal.js';

@Component({
  selector: 'ddx-market',
  templateUrl: './ddx-market.component.html',
  styleUrls: ['./ddx-market.component.scss'],
})
export class MarketComponent implements OnInit {
  @Input() activeSymbol: TradeSymbol;
  @Input() tickerData: TradeTicker[];
  @Input() balanceData: TradeBalance[];

  private currentActiveType: string;

  buyAmount: number;
  @ViewChild('buyTotalInput') buyTotalInput: ElementRef;

  sellAmount: number;
  @ViewChild('sellTotalInput') sellTotalInput: ElementRef;

  constructor() {
    this.currentActiveType = 'market';

    this.buyAmount = 0;
    this.sellAmount = 0;
  }

  ngOnInit() {}

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

  get bestBid(): Decimal {
    return new Decimal(this.getTickerDataFromSymbol().bid);
  }

  get bestAsk(): Decimal {
    return new Decimal(this.getTickerDataFromSymbol().ask);
  }

  get buyTotal(): Decimal {
    return this.bestBid.mul(this.buyAmount);
  }

  get buyTakerFee(): Decimal {
    return this.activeSymbol.feeSide === 0
      ? new Decimal(this.buyAmount).mul(this.activeSymbol.takeLiquidityRate)
      : this.buyTotal.mul(this.activeSymbol.takeLiquidityRate);
  }

  get buyApproxPay(): Decimal {
    return this.buyTotal.minus(this.buyTakerFee);
  }

  get sellTotal(): Decimal {
    return this.bestAsk.mul(this.sellAmount);
  }

  get sellTakerFee(): Decimal {
    return this.activeSymbol.feeSide === 0
      ? new Decimal(this.sellAmount).mul(this.activeSymbol.takeLiquidityRate)
      : this.sellTotal.mul(this.activeSymbol.takeLiquidityRate);
  }

  get sellApproxPay(): Decimal {
    return this.sellTotal.minus(this.sellTakerFee);
  }

  getTickerDataFromSymbol(): TradeTicker {
    return getTickerFromSymbol(this.tickerData, this.activeSymbol);
  }

  activateType(newType: string): void {
    this.currentActiveType = newType;
  }

  onSubmitBuy(): void {}
  onSubmitSell(): void {}
}
