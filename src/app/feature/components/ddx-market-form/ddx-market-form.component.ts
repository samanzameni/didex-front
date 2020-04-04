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
} from '@core/models';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProButtonComponent } from '@widget/components';
import { DropdownSelectItem } from '@widget/models';
import { AuthService } from '@core/services';
import { OrderRESTService } from '@core/services/REST';
import Decimal from 'decimal.js';
import { getTickerFromSymbol } from '@core/util/ticker';

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

  private marketForm: FormGroup;
  private formErrors: any;
  private timeInForceItems: DropdownSelectItem[];

  @ViewChild('totalInput') totalInput: ElementRef;
  @ViewChild('submitButton') submitButton: ProButtonComponent;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private orderService: OrderRESTService
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

  ngOnInit(): void {
    this.marketForm = this.formBuilder.group({
      marketSymbol: [this.activeSymbol.symbol, []],
      side: [this.side === 'buy' ? OrderSide.Buy : OrderSide.Sell, []],
      type: [
        this.activeType === 'market' ? OrderType.Market : OrderType.Limit,
        [],
      ],
      quantity: [
        0,
        [
          Validators.required,
          Validators.min(this.activeSymbol.quantityIncrement),
        ],
      ],
      price: [0, []],
      postOnly: [false, []],
      timeInForce: [OrderTimeInForce.GoodTillCancelled, []],
    });
  }

  ngOnChanges(): void {
    this.marketForm = this.formBuilder.group({
      marketSymbol: [this.activeSymbol.symbol, []],
      side: [this.side === 'buy' ? OrderSide.Buy : OrderSide.Sell, []],
      type: [
        this.activeType === 'market' ? OrderType.Market : OrderType.Limit,
        [],
      ],
      quantity: [
        0,
        [
          Validators.required,
          Validators.min(this.activeSymbol.quantityIncrement),
        ],
      ],
      price: [this.activeSymbol.tickSize, []],
      postOnly: [false, []],
      timeInForce: [OrderTimeInForce.GoodTillCancelled, []],
    });
  }

  get marketFormGroup(): FormGroup {
    return this.marketForm;
  }

  get baseBalanceData(): Balance {
    if (!this.balanceData) {
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
    if (!this.balanceData) {
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
    return this.bestBid.mul(this.marketForm.controls.quantity.value || 0);
  }

  private get sellTotal(): Decimal {
    return this.bestAsk.mul(this.marketForm.controls.quantity.value || 0);
  }

  get total(): Decimal {
    return this.side === 'buy' ? this.buyTotal : this.sellTotal;
  }

  get takerFee(): Decimal {
    return this.activeSymbol.feeSide === 0
      ? new Decimal(this.marketForm.controls.quantity.value || 0).mul(
          this.activeSymbol.takeLiquidityRate
        )
      : this.total.mul(this.activeSymbol.takeLiquidityRate);
  }

  get buyApproxPay(): Decimal {
    return Decimal.max(this.buyTotal.plus(this.takerFee), 0);
  }

  get sellApproxPay(): Decimal {
    return Decimal.max(this.sellTotal.minus(this.takerFee), 0);
  }

  get errors(): any {
    return this.formErrors;
  }

  private getTickerDataFromSymbol(): Ticker {
    return getTickerFromSymbol(this.tickerData, this.activeSymbol);
  }

  submitForm(): void {
    if (
      this.marketForm.controls.quantity.hasError('required') ||
      this.marketForm.controls.quantity.hasError('min')
    ) {
      alert('Amount should be positive.');
      return;
    }
    this.submitButton.setLoadingOn();

    if (!this.authService.isAuthorized) {
      this.authService.handleAuthError();
    }

    const dataToSend: OrderData = this.marketForm.value;

    this.orderService.requestOrder(dataToSend).subscribe(
      (response) => {
        this.submitButton.setLoadingOff();
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
            if (!['Price', 'Quantity', 'MarketSymbol'].includes(key)) {
              alert(`An error occured: There is something wrong with ${key}`);
            }
          }
        }
      }
    );
  }
}
