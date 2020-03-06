import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { TradeSymbol, Balance, Ticker } from '@core/models';
import { getTickerFromSymbol } from '@core/util/ticker';

import { Decimal } from 'decimal.js';
import { OrderRESTService } from '@core/services/REST';
import {
  OrderData,
  OrderSide,
  OrderType,
  OrderTimeInForce,
} from '@core/models/ddx-order.model';
import { DropdownSelectItem } from '@widget/models';

@Component({
  selector: 'ddx-market',
  templateUrl: './ddx-market.component.html',
  styleUrls: ['./ddx-market.component.scss'],
})
export class MarketComponent implements OnInit {
  @Input() activeSymbol: TradeSymbol;
  @Input() tickerData: Ticker[];
  @Input() balanceData: Balance[];

  private currentActiveType: string;

  buyAmount: number;
  buyLimit: number;
  buyTimeInForce: OrderTimeInForce;
  buyPostOnly: boolean;
  @ViewChild('buyTotalInput') buyTotalInput: ElementRef;
  @ViewChild('buyButton') buyButton: ElementRef;

  sellAmount: number;
  sellLimit: number;
  sellTimeInForce: OrderTimeInForce;
  sellPostOnly: boolean;
  @ViewChild('sellTotalInput') sellTotalInput: ElementRef;
  @ViewChild('sellButton') sellButton: ElementRef;

  constructor(
    private orderService: OrderRESTService,
    private renderer: Renderer2
  ) {
    this.currentActiveType = 'limit';

    // this.buyAmount = 0;
    // this.buyLimit = 0;
    // this.sellAmount = 0;
    // this.sellLimit = 0;
  }

  ngOnInit() {}

  get activeType(): string {
    return this.currentActiveType;
  }

  get baseBalanceData(): Balance {
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

  get quoteBalanceData(): Balance {
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

  get timeInForceDropdownItems(): DropdownSelectItem[] {
    const keys = Object.keys(OrderTimeInForce);
    const names = keys.slice(keys.length / 2);

    return names.map(name => {
      return {
        title: name,
        value: OrderTimeInForce[name],
      };
    });
  }

  get bestBid(): Decimal {
    return new Decimal(
      this.tickerData && this.tickerData.length > 0
        ? this.getTickerDataFromSymbol().bid
        : 0
    );
  }

  get bestAsk(): Decimal {
    return new Decimal(
      this.tickerData && this.tickerData.length > 0
        ? this.getTickerDataFromSymbol().ask
        : 0
    );
  }

  get buyTotal(): Decimal {
    return this.bestBid.mul(this.buyAmount || 0);
  }

  get baseTotal(): Decimal {
    return new Decimal(this.baseBalanceData.available).add(
      this.baseBalanceData.reserved
    );
  }

  get quoteTotal(): Decimal {
    return new Decimal(this.quoteBalanceData.available).add(
      this.quoteBalanceData.reserved
    );
  }

  get buyTakerFee(): Decimal {
    return this.activeSymbol.feeSide === 0
      ? new Decimal(this.buyAmount || 0).mul(
          this.activeSymbol.takeLiquidityRate
        )
      : this.buyTotal.mul(this.activeSymbol.takeLiquidityRate);
  }

  get buyApproxPay(): Decimal {
    return this.buyTotal.plus(this.buyTakerFee);
  }

  get sellTotal(): Decimal {
    return this.bestAsk.mul(this.sellAmount || 0);
  }

  get sellTakerFee(): Decimal {
    return this.activeSymbol.feeSide === 0
      ? new Decimal(this.sellAmount || 0).mul(
          this.activeSymbol.takeLiquidityRate
        )
      : this.sellTotal.mul(this.activeSymbol.takeLiquidityRate);
  }

  get sellApproxPay(): Decimal {
    return this.sellTotal.minus(this.sellTakerFee);
  }

  getTickerDataFromSymbol(): Ticker {
    return getTickerFromSymbol(this.tickerData, this.activeSymbol);
  }

  activateType(newType: string): void {
    this.currentActiveType = newType;
  }

  onSelectBuyTimeInForce(selectedValue: number): void {
    this.buyTimeInForce = selectedValue;
  }

  onSelectSellTimeInForce(selectedValue: number): void {
    this.sellTimeInForce = selectedValue;
  }

  onSellPostOnlyCheck(checked: boolean): void {
    this.sellPostOnly = checked;
  }

  onBuyPostOnlyCheck(checked: boolean): void {
    this.buyPostOnly = checked;
  }

  onSubmitBuy(): void {
    this.setLoadingOn(this.buyButton);

    let dataToSend: OrderData = {
      marketSymbol: this.activeSymbol.symbol,
      side: OrderSide.Buy,
      type: OrderType.Market,
      quantity: this.buyAmount,
      price: 1,
      postOnly: false,
    };

    if (this.activeType === 'limit') {
      dataToSend = {
        ...dataToSend,
        type: OrderType.Limit,
        timeInForce: this.buyTimeInForce,
        price: this.buyLimit,
        postOnly: this.buyPostOnly,
      };
    }

    this.orderService.requestOrder(dataToSend).subscribe(
      response => {
        // TODO
        this.setLoadingOff(this.buyButton);
      },
      errorResponse => {
        // TODO
        this.setLoadingOff(this.buyButton);
      }
    );
  }

  onSubmitSell(): void {
    this.setLoadingOn(this.sellButton);

    let dataToSend: OrderData = {
      marketSymbol: this.activeSymbol.symbol,
      side: OrderSide.Sell,
      type: OrderType.Market,
      quantity: this.sellAmount,
      price: 1,
      postOnly: false,
    };

    if (this.activeType === 'limit') {
      dataToSend = {
        ...dataToSend,
        type: OrderType.Limit,
        timeInForce: this.sellTimeInForce,
        price: this.sellLimit,
        postOnly: this.sellPostOnly,
      };
    }

    this.orderService.requestOrder(dataToSend).subscribe(
      response => {
        // TODO
        this.setLoadingOff(this.sellButton);
      },
      errorResponse => {
        // TODO
        this.setLoadingOff(this.sellButton);
      }
    );
  }

  private setLoadingOn(button: ElementRef): void {
    this.renderer.addClass(button.nativeElement, 'is-loading');
  }

  private setLoadingOff(button: ElementRef): void {
    this.renderer.removeClass(button.nativeElement, 'is-loading');
  }
}
