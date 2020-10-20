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
  private orderTypeItems: any[];

  constructor(
    private restService: OrderRESTService,
    private snackbarService: MatSnackBar
  ) {
    this.currentActivePane = 'active';
    this.cancelingOrderIDs = [];

    this.loadActiveOrdersNextPage = new EventEmitter();
    this.loadFilledOrdersNextPage = new EventEmitter();
    this.loadTradesNextPage = new EventEmitter();

    // Extracting orderType items from enum
    const orderTypeKeys = Object.keys(OrderType);
    const orderTypeNames = orderTypeKeys.slice(orderTypeKeys.length / 2);

    this.orderTypeItems = orderTypeNames.map((name) => {
      return {
        title: name
          .split(/\s|_|(?=[A-Z])/)
          .join('_')
          .toLowerCase(),
        value: OrderType[name],
      };
    });
  }

  ngOnInit(): void {}

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

  get orderTypeEnumItems(): any[] {
    return this.orderTypeItems;
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
