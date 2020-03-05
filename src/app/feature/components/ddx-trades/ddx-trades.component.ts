import { Component, OnInit, Input } from '@angular/core';
import {
  TradeSymbol,
  Order,
  OrderStatus,
  OrderSide,
  Trade,
} from '@core/models';
import Decimal from 'decimal.js';

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
  @Input() orderData: Order[];
  @Input() tradeData: Trade[];
  @Input() filledOrderData: Order[];

  private currentActivePane: string;

  constructor() {
    this.currentActivePane = 'active';
  }

  ngOnInit(): void {}

  get activePane(): string {
    return this.currentActivePane;
  }

  activatePane(newPane: string): void {
    this.currentActivePane = newPane;
  }

  get activeOrders(): Order[] {
    return (this.orderData || []).map(order => {
      order.createdAt = order.createdAt.replace('T', ' ').substr(0, 19);
      return order;
    });
  }

  get filledOrders(): Order[] {
    return (this.filledOrderData || []).map(order => {
      order.createdAt = order.createdAt.replace('T', ' ').substr(0, 19);
      return order;
    });
  }

  get privateTrades(): Trade[] {
    return (this.tradeData || []).map(trade => {
      trade.timeStamp = trade.timeStamp.replace('T', ' ').substr(0, 19);
      return trade;
    });
  }

  getTotalPrice(order: Order): Decimal {
    return new Decimal(order.price).mul(order.quantity);
  }

  getPriceCellCSSClass(row: Order | Trade): string {
    return row.side === OrderSide.Buy ? 'green' : 'red';
  }
}
