import { Component, OnInit } from '@angular/core';
import { Order, Trade, OrderSide, Transaction } from '@core/models';
import {
  OrderDATAService,
  TradeDATAService,
  FilledOrderDATAService,
  PrivateTradeDATAService,
  TransactionsDATAService,
} from '@core/services/DATA';
import Decimal from 'decimal.js';

@Component({
  selector: 'ddx-reports',
  templateUrl: './ddx-reports.component.html',
  styleUrls: [
    '../../../public/ddx-account-pages.scss',
    './ddx-reports.component.scss',
  ],
})
export class ReportsPageComponent implements OnInit {
  private orders: Order[];
  private trades: Trade[];
  private transactions: any[];

  private currentActivePane: string;

  constructor(
    private orderDataService: FilledOrderDATAService,
    private tradeDataService: PrivateTradeDATAService,
    private transactionsDataService: TransactionsDATAService
  ) {
    this.currentActivePane = 'orders';
  }

  ngOnInit(): void {
    this.orderDataService.dataStream$.subscribe(data => {
      this.orders = data || [];
    });
    this.orderDataService.updateData();

    this.tradeDataService.dataStream$.subscribe(data => {
      this.trades = data || [];
    });
    this.tradeDataService.updateData();

    this.transactionsDataService.dataStream$.subscribe(data => {
      this.transactions = data || [];
    });
    this.transactionsDataService.updateData();
  }

  get orderData(): Order[] {
    return (this.orders || []).map(order => {
      order.createdAt = order.createdAt.replace('T', ' ').substr(0, 19);
      return order;
    });
  }

  get tradeData(): Trade[] {
    return (this.trades || []).map(trade => {
      trade.timeStamp = trade.timeStamp.replace('T', ' ').substr(0, 19);
      return trade;
    });
  }

  get transactionsData(): Transaction[] {
    return (this.transactions || []).map(transaction => {
      transaction.createdAt = transaction.createdAt
        .replace('T', ' ')
        .substr(0, 19);
      return transaction;
    });
  }

  get activePane(): string {
    return this.currentActivePane;
  }

  activatePane(newPane: string): void {
    this.currentActivePane = newPane;
  }

  getPriceCellCSSClass(row: Trade): string {
    return row.side === OrderSide.Buy ? 'green' : 'red';
  }

  getTotalPrice(order: Order): Decimal {
    return new Decimal(order.price).mul(order.quantity);
  }
}
