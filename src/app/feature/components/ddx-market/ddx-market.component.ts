import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Renderer2,
  ChangeDetectorRef,
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
  OrderBookResponse,
  OrderBookRecord,
  OrderClickEventData,
} from '@core/models/ddx-order.model';
import { DropdownSelectItem } from '@widget/models';
import { AuthService, DirectionService, StorageService } from '@core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'ddx-market',
  templateUrl: './ddx-market.component.html',
  styleUrls: ['./ddx-market.component.scss'],
})
export class MarketComponent implements OnInit {
  @Input() activeSymbol: TradeSymbol;
  @Input() activeOrder: OrderClickEventData;
  @Input() tickerData: Ticker[];
  @Input() balanceData: Balance[];
  @Input() bankingBalanceData: Balance[];
  @Input() orderBookData: OrderBookResponse;

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

  private buyFormErrors: any;
  private sellFormErrors: any;

  constructor(
    private orderService: OrderRESTService,
    private authService: AuthService,
    private renderer: Renderer2,
    private cdRef: ChangeDetectorRef,
    private directionService: DirectionService,
    protected storageService: StorageService
  ) {
    this.currentActiveType = storageService.getMarketType() || 'limit';
    this.sellFormErrors = {};

    // this.buyAmount = 0;
    // this.buyLimit = 0;
    // this.sellAmount = 0;
    // this.sellLimit = 0;
  }

  ngOnInit() {}

  get direction$(): Observable<string> {
    return this.directionService.direction$;
  }

  private bidSorter(a: OrderBookRecord, b: OrderBookRecord): number {
    if (!a || !b) {
      return 0;
    }

    if (a.price < b.price) {
      return 1;
    }

    if (a.price === b.price) {
      return 0;
    }

    return -1;
  }

  private askSorter(a: OrderBookRecord, b: OrderBookRecord): number {
    if (!a || !b) {
      return 0;
    }

    if (a.price > b.price) {
      return 1;
    }

    if (a.price === b.price) {
      return 0;
    }

    return -1;
  }

  get activeType(): string {
    return this.currentActiveType;
  }

  get bidsTableData(): OrderBookRecord[] {
    return this.orderBookData
      ? this.orderBookData.bid.sort(this.bidSorter)
      : [];
  }

  get asksTableData(): OrderBookRecord[] {
    return this.orderBookData
      ? this.orderBookData.ask.sort(this.askSorter)
      : [];
  }

  get baseBalanceData(): Balance {
    if (!this.activeType || !this.balanceData) {
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
    if (!this.activeType || !this.balanceData) {
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

    return names.map((name) => {
      return {
        title: name,
        value: OrderTimeInForce[name],
      };
    });
  }

  get bestBid(): Decimal {
    return new Decimal(
      this.tickerData && this.tickerData.length > 0
        ? this.getTickerDataFromSymbol()
          ? this.getTickerDataFromSymbol().bid
          : 0
        : 0
    );
  }

  get bestAsk(): Decimal {
    return new Decimal(
      this.tickerData && this.tickerData.length > 0
        ? this.getTickerDataFromSymbol()
          ? this.getTickerDataFromSymbol().ask
          : 0
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

  get buyErrors(): any {
    return this.buyFormErrors || {};
  }

  get sellErrors(): any {
    return this.sellFormErrors || {};
  }

  getTickerDataFromSymbol(): Ticker {
    return getTickerFromSymbol(this.tickerData, this.activeSymbol);
  }

  activateType(newType: string): void {
    this.currentActiveType = newType;
    this.storageService.setMarketType(newType);
    this.cdRef.detectChanges();
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
    if (this.buyAmount === undefined || this.buyAmount === 0) {
      alert('Amount should be positive.');
      return;
    }
    this.setLoadingOn(this.buyButton);

    if (!this.authService.isAuthorized) {
      this.authService.handleAuthError();
    }

    let dataToSend: OrderData = {
      marketSymbol: this.activeSymbol.symbol,
      side: OrderSide.Buy,
      type: OrderType.Market,
      quantity: this.buyAmount,
      price: 1,
      postOnly: false,
    };

    if (this.activeType === 'limit') {
      if (this.buyLimit === undefined || this.buyLimit === 0) {
        alert('Limit should be positive.');
        return;
      }
      dataToSend = {
        ...dataToSend,
        type: OrderType.Limit,
        timeInForce: this.buyTimeInForce,
        price: this.buyLimit,
        postOnly: this.buyPostOnly,
      };
    }

    this.orderService.requestOrder(dataToSend).subscribe(
      (response) => {
        this.setLoadingOff(this.buyButton);
      },
      (errorResponse) => {
        this.setLoadingOff(this.buyButton);
        if (errorResponse.status === 401) {
          this.authService.handleAuthError();
        }
        if (errorResponse.status === 400) {
          const errors = errorResponse.error.errors;

          if (errors.Price) {
            this.buyFormErrors.limit = errors.Price;
          }
          if (errors.Quantity) {
            this.buyFormErrors.amount = errors.Quantity;
          }
          if (errors.MarketSymbol) {
            this.buyFormErrors.symbol = errors.MarketSymbol;
          }

          for (const key of Object.keys(errors)) {
            if (!['Price', 'Quantity', 'MarketSymbol'].includes(key)) {
              alert(`An error occured: There is something wrong with ${key}`);
            }
          }
        }
      }
    );
  }

  onSubmitSell(): void {
    if (this.sellAmount === undefined || this.sellAmount === 0) {
      alert('Amount should be positive.');
      return;
    }
    this.setLoadingOn(this.sellButton);

    if (!this.authService.isAuthorized) {
      this.authService.handleAuthError();
    }

    let dataToSend: OrderData = {
      marketSymbol: this.activeSymbol.symbol,
      side: OrderSide.Sell,
      type: OrderType.Market,
      quantity: this.sellAmount,
      price: 1,
      postOnly: false,
    };

    if (this.activeType === 'limit') {
      if (this.sellLimit === undefined || this.sellLimit === 0) {
        alert('Limit should be positive.');
        return;
      }
      dataToSend = {
        ...dataToSend,
        type: OrderType.Limit,
        timeInForce: this.sellTimeInForce,
        price: this.sellLimit,
        postOnly: this.sellPostOnly,
      };
    }

    this.orderService.requestOrder(dataToSend).subscribe(
      (response) => {
        this.setLoadingOff(this.sellButton);
      },
      (errorResponse) => {
        this.setLoadingOff(this.sellButton);
        if (errorResponse.status === 401) {
          this.authService.handleAuthError();
        }
        if (errorResponse.status === 400) {
          const errors = errorResponse.error.errors;

          if (errors.Price) {
            this.sellFormErrors.limit = errors.Price;
          }
          if (errors.Quantity) {
            this.sellFormErrors.amount = errors.Quantity;
          }
          if (errors.MarketSymbol) {
            this.sellFormErrors.symbol = errors.MarketSymbol;
          }

          for (const key of Object.keys(errors)) {
            if (!['Price', 'Quantity', 'MarketSymbol'].includes(key)) {
              alert(`An error occured: There is something wrong with ${key}`);
            }
          }
        }
      }
    );
  }

  private setLoadingOn(button: ElementRef): void {
    if (this.renderer) {
      this.renderer.addClass(button.nativeElement, 'is-loading');
    }
  }

  private setLoadingOff(button: ElementRef): void {
    if (this.renderer) {
      this.renderer.removeClass(button.nativeElement, 'is-loading');
    }
  }
}
