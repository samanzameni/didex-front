import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  OnChanges,
} from '@angular/core';
import {
  TradeSymbol,
  Balance,
  Ticker,
  OrderSide,
  OrderType,
  OrderTimeInForce,
  OrderData,
  Order,
  OrderBookRecord,
} from '@core/models';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProButtonComponent } from '@widget/components';
import { DropdownSelectItem } from '@widget/models';
import { AuthService } from '@core/services';
import { OrderRESTService } from '@core/services/REST';
import Decimal from 'decimal.js';
import { getTickerFromSymbol } from '@core/util/ticker';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ddx-market-form',
  templateUrl: './ddx-market-form.component.html',
  styleUrls: ['./ddx-market-form.component.scss'],
})
export class MarketFormComponent implements OnInit, OnChanges {
  @Input() activeSymbol: TradeSymbol;
  @Input() tickerData: Ticker[];
  @Input() balanceData: Balance[];

  @Input() side: 'buy' | 'sell';
  @Input() activeType: 'market' | 'limit';
  @Input() activeOrders: OrderBookRecord[];

  private marketForm: FormGroup;
  private formErrors: any;
  private timeInForceItems: DropdownSelectItem[];

  @ViewChild('submitButton') submitButton: ProButtonComponent;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private orderService: OrderRESTService,
    private toastr: ToastrService
  ) {
    this.side = 'buy';
    this.activeType = 'limit';
    this.formErrors = {};

    // Extracting dropdown items from enum
    const keys = Object.keys(OrderTimeInForce);
    const names = keys.slice(keys.length / 2);

    this.timeInForceItems = names.map((name) => {
      return {
        title: name,
        value: OrderTimeInForce[name],
      };
    });
  }

  private buildFormGroup(): void {
    this.marketForm = this.formBuilder.group({
      marketSymbol: [this.activeSymbol.symbol, []],
      side: [this.side === 'buy' ? OrderSide.Buy : OrderSide.Sell, []],
      type: [
        this.activeType === 'market' ? OrderType.Market : OrderType.Limit,
        [],
      ],
      quantity: [
        this.activeSymbol.quantityIncrement,
        [
          Validators.required,
          Validators.min(this.activeSymbol.quantityIncrement),
        ],
      ],
      price: [
        Math.max(
          (this.side === 'buy' ? this.bestAsk : this.bestBid).toNumber(),
          this.activeSymbol.tickSize
        ),
        [Validators.required, Validators.min(this.activeSymbol.tickSize)],
      ],
      postOnly: [false, []],
      timeInForce: [OrderTimeInForce.GoodTillCancelled, []],
    });
  }

  ngOnInit(): void {
    this.buildFormGroup();
  }

  ngOnChanges(): void {
    this.buildFormGroup();
  }

  get marketFormGroup(): FormGroup {
    return this.marketForm;
  }

  get baseBalanceData(): Balance {
    if (!this.balanceData) {
      return {
        currency: this.activeSymbol.baseCurrencyShortName,
        available: 0,
        reserved: 0,
      };
    }

    for (const item of this.balanceData) {
      if (item.currency === this.activeSymbol.baseCurrencyShortName) {
        return item;
      }
    }

    return {
      currency: this.activeSymbol.baseCurrencyShortName,
      available: 0,
      reserved: 0,
    };
  }

  get quoteBalanceData(): Balance {
    if (!this.balanceData) {
      return {
        currency: this.activeSymbol.quoteCurrencyShortName,
        available: 0,
        reserved: 0,
      };
    }

    for (const item of this.balanceData) {
      if (item.currency === this.activeSymbol.quoteCurrencyShortName) {
        return item;
      }
    }

    return {
      currency: this.activeSymbol.quoteCurrencyShortName,
      available: 0,
      reserved: 0,
    };
  }

  get timeInForceTooltipContent(): string {
    return `GoodTillCancelled: lasts until the order is completed or canceled.

          ImmediateOrCancel: IOC is an order to buy or sell an currency that executes all or part immediately and cancels any unfilled portion of the order.

          FillOrKill: FOK order executes a transaction immediately and completely or not at all. (i.e., no partial execution of the order is allowed)

          Day: automatically expires if not executed on the day the order was placed. A day ends at 00:00 UTC time.

          GoodTillDate: automatically expires at the specified date and time.`;
  }

  get timeInForceDropdownItems(): DropdownSelectItem[] {
    return this.timeInForceItems;
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

  private get buyTotal(): Decimal {
    if (this.activeType === 'limit') {
      const amount = new Decimal(this.marketFormGroup.controls.quantity.value);
      const limit = new Decimal(this.marketFormGroup.controls.price.value);
      return amount.mul(limit);
    }

    return new Decimal(0); // N/A
  }

  private get sellTotal(): Decimal {
    if (this.activeType === 'limit') {
      const amount = new Decimal(this.marketFormGroup.controls.quantity.value);
      const limit = new Decimal(this.marketFormGroup.controls.price.value);
      return amount.mul(limit);
    }

    return new Decimal(0); // N/A
  }

  get total(): Decimal {
    return this.side === 'buy' ? this.buyTotal : this.sellTotal;
  }

  get takerFee(): Decimal {
    if (this.activeType === 'market') {
      const averagePrice = this.getAveragePrice();
      return averagePrice === null
        ? new Decimal(0)
        : averagePrice.mul(this.activeSymbol.takeLiquidityRate);
    }
    return this.total.mul(this.activeSymbol.takeLiquidityRate);
  }

  get makerFee(): Decimal {
    return this.total.mul(this.activeSymbol.provideLiquidityRate);
  }

  private getAveragePrice(): Decimal {
    const inputAmount: number = this.marketFormGroup.controls.quantity.value;
    let remainingAmount = new Decimal(inputAmount);
    let averagePrice = new Decimal(0);

    for (const orderRecord of this.activeOrders) {
      if (remainingAmount.greaterThan(orderRecord.volume)) {
        averagePrice = averagePrice.add(
          new Decimal(orderRecord.price).mul(orderRecord.volume)
        );
        remainingAmount = remainingAmount.minus(orderRecord.volume);
      } else {
        averagePrice = averagePrice.add(
          new Decimal(orderRecord.price).mul(remainingAmount)
        );
        remainingAmount = new Decimal(0);
      }
    }

    if (remainingAmount.greaterThan(0)) {
      return null; // Not available in market
    }

    return averagePrice;
  }

  get buyApproxPay(): Decimal {
    const averagePrice = this.getAveragePrice();

    if (averagePrice === null) {
      return null;
    }
    return Decimal.max(averagePrice.plus(this.takerFee), 0);
  }

  get sellApproxPay(): Decimal {
    const averagePrice = this.getAveragePrice();

    if (averagePrice === null) {
      return null;
    }

    return Decimal.max(averagePrice.minus(this.takerFee), 0);
  }

  get approxPay(): Decimal {
    return this.side === 'buy' ? this.buyApproxPay : this.sellApproxPay;
  }

  get errors(): any {
    return this.formErrors;
  }

  private getTickerDataFromSymbol(): Ticker {
    return getTickerFromSymbol(this.tickerData, this.activeSymbol);
  }

  submitForm(): void {
    // if (!this.marketForm.valid) {
    //   console.warn(this.marketForm.valid);
    //   console.warn(this.marketForm.value);
    //   console.log(this.marketForm.errors);
    //   return;
    // }
    this.submitButton.setLoadingOn();

    if (!this.authService.isAuthorized) {
      this.authService.handleAuthError();
    }

    const dataToSend: OrderData = this.marketForm.value;

    this.orderService.requestOrder(dataToSend).subscribe(
      (response: Order) => {
        this.submitButton.setLoadingOff();
        this.toastr.success(
          `Your order ID: ${response.id}`,
          'Order submitted!'
        );
      },
      (errorResponse) => {
        this.submitButton.setLoadingOff();
        if (errorResponse.status === 401) {
          this.authService.handleAuthError();
        }
        if (errorResponse.status === 400) {
          const errors = errorResponse.error.errors;

          if (errors.Price) {
            this.formErrors.limit = errors.Price;
          }
          if (errors.Quantity) {
            this.formErrors.amount = errors.Quantity;
          }
          if (errors.MarketSymbol) {
            this.formErrors.symbol = errors.MarketSymbol;
          }

          for (const key of Object.keys(errors)) {
            if (
              !['Price', 'Quantity', 'MarketSymbol', 'default'].includes(key)
            ) {
              alert(`An error occured: There is something wrong with ${key}`);
            }
          }
        }
      }
    );
  }
}
