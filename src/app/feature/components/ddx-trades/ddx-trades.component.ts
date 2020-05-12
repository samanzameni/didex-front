import { Component, OnInit, Input } from '@angular/core';
import {
  TradeSymbol,
  Order,
  OrderStatus,
  OrderSide,
  Trade,
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

  private currentActivePane: string;
  private cancelingOrderIDs: string[];

  constructor(
    private restService: OrderRESTService,
    private snackbarService: MatSnackBar
  ) {
    this.currentActivePane = 'active';
    this.cancelingOrderIDs = [];
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
}
