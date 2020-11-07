import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  TradeSymbol,
  Order,
  OrderStatus,
  OrderSide,
  Trade,
  OrderType,
} from '@core/models';
import Decimal from 'decimal.js';
import { OrderRESTService } from '@core/services/REST';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TIMEZONES } from '@core/util/constants';
import { TraderService } from '@core/services';

@Component({
  selector: 'ddx-trades',
  templateUrl: './ddx-trades.component.html',
  styleUrls: [
    '../../public/ddx-homepage-tables.scss',
    './ddx-trades.component.scss',
  ],
})
export class TradesComponent implements OnInit {
  @Input() activeSymbol: TradeSymbol;
  @Input() isAuthorized: boolean;
  @Input() orderData: Order[];
  @Input() tradeData: Trade[];
  @Input() filledOrderData: Order[];

  @Output() loadActiveOrdersNextPage: EventEmitter<any>;
  @Output() loadFilledOrdersNextPage: EventEmitter<any>;
  @Output() loadTradesNextPage: EventEmitter<any>;

  private currentActivePane: string;
  private cancelingOrderIDs: string[];
  private orderStatusItems: any[];

  private timezoneAbbr: string = 'UTC';

  constructor(
    private restService: OrderRESTService,
    private snackbarService: MatSnackBar,
    private traderService: TraderService
  ) {
    this.currentActivePane = 'active';
    this.cancelingOrderIDs = [];

    this.loadActiveOrdersNextPage = new EventEmitter();
    this.loadFilledOrdersNextPage = new EventEmitter();
    this.loadTradesNextPage = new EventEmitter();

    // Extracting orderType items from enum
    const orderStatusKeys = Object.keys(OrderStatus);
    const orderStatusNames = orderStatusKeys.slice(orderStatusKeys.length / 2);

    this.orderStatusItems = orderStatusNames.map((name) => {
      return {
        title: name
          .split(/\s|_|(?=[A-Z])/)
          .join('_')
          .toLowerCase(),
        value: OrderStatus[name],
      };
    });
  }

  ngOnInit(): void {
    if (this.traderService.currentTrader && this.traderTimezoneText) {
      TIMEZONES.forEach((timezone) => {
        if (timezone.text.includes(this.traderTimezoneText)) {
          this.timezoneAbbr = timezone.abbr;
          return;
        }
      });
    }
  }

  get activePane(): string {
    return this.currentActivePane;
  }

  activatePane(newPane: string): void {
    this.currentActivePane = newPane;
  }

  get activeOrders(): Order[] {
    return this.orderData || [];
  }

  get filledOrders(): Order[] {
    return this.filledOrderData || [];
  }

  get privateTrades(): Trade[] {
    return this.tradeData || [];
  }

  get cancelingIDs(): string[] {
    return this.cancelingOrderIDs;
  }

  get orderStatusEnumItems(): any[] {
    return this.orderStatusItems;
  }

  get traderTimezoneOffset() {
    return (
      this.traderService.currentTrader.generalInformation.timeZone.slice(
        4,
        10
      ) || '+0000'
    );
  }

  get traderTimezoneText() {
    return this.traderService.currentTrader.generalInformation.timeZone;
  }

  get traderTimezoneTitleAbbr(): string {
    return this.timezoneAbbr;
  }

  getTotalPrice(order: Order): Decimal {
    return new Decimal(order.price).mul(order.quantity);
  }

  getPriceCellCSSClass(row: Order | Trade): string {
    return row.side === OrderSide.Buy ? 'green' : 'red';
  }

  cancelOrder(orderID: string): void {
    this.cancelingOrderIDs.push(orderID);
    this.restService.requestCancelOrder(orderID).subscribe(
      (response) => {
        const canceledIndex = this.cancelingOrderIDs.indexOf(orderID);
        if (canceledIndex >= 0) {
          this.cancelingOrderIDs.splice(canceledIndex, 1);
        }
        this.snackbarService.open(`Order canceled. ID: ${orderID}`, '', {
          duration: 2000,
        });
      },
      (errorResponse) => {
        this.snackbarService.open(
          `An error occured while canceling order. ID: ${orderID}`,
          '',
          {
            duration: 2000,
          }
        );
      }
    );
  }

  onScrollOnActiveOrders(): void {
    this.loadActiveOrdersNextPage.emit(null);
  }

  onScrollOnFilledOrders(): void {
    this.loadFilledOrdersNextPage.emit(null);
  }

  onScrollOnTrades(): void {
    this.loadTradesNextPage.emit(null);
  }
}
