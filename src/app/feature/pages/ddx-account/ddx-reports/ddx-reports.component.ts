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
    this.orderDataService.dataStream$.subscribe((data) => {
      this.orders = data || [];
    });
    this.orderDataService.updateData();

    this.tradeDataService.dataStream$.subscribe((data) => {
      this.trades = data || [];
    });
    this.tradeDataService.updateData();

    this.transactionsDataService.dataStream$.subscribe((data) => {
      this.transactions = data || [];
    });
    this.transactionsDataService.updateData();
  }

  get orderData(): any[] {
    return (this.orders || []).map((order) => {
      const mapped: any = { ...order };
      mapped.createdAt = order.createdAt.replace('T', ' ').substr(0, 19);
      mapped.execAmount = order.executedQuantity + '/' + order.quantity;
      mapped.total = this.getTotalPrice(order);
      return mapped;
    });
  }

  get blah(): any[] {
    return [{}, {}, {}];
  }

  get orderTableColumns(): string[] {
    return ['createdAt', 'marketSymbol', 'id', 'price', 'execAmount', 'total'];
  }

  getOrderHeaderFromColumn(column: string): string {
    switch (column) {
      case 'createdAt':
        return 'Time';
      case 'marketSymbol':
        return 'Symbol';
      case 'id':
        return 'ID';
      case 'price':
        return 'Price';
      case 'execAmount':
        return 'Exec/Amount';
      case 'total':
        return 'Total';
      default:
        return '';
    }
  }

  get tradeData(): Trade[] {
    return (this.trades || []).map((trade) => {
      trade.timeStamp = trade.timeStamp.replace('T', ' ').substr(0, 19);
      return trade;
    });
  }

  get tradeTableColumns(): string[] {
    return [
      'timeStamp',
      'marketSymbol',
      'id',
      'side',
      'volume',
      'price',
      'volumeInQuote',
      'fee',
    ];
  }

  getTradeHeaderFromColumn(column: string): string {
    switch (column) {
      case 'timeStamp':
        return 'Time';
      case 'marketSymbol':
        return 'Symbol';
      case 'id':
        return 'ID';
      case 'side':
        return 'Side';
      case 'volume':
        return 'Amount';
      case 'price':
        return 'Price';
      case 'volumeInQuote':
        return 'Total';
      case 'fee':
        return 'Fee';
      default:
        return '';
    }
  }

  get transactionsData(): Transaction[] {
    return (this.transactions || []).map((transaction) => {
      transaction.createdAt = transaction.createdAt
        .replace('T', ' ')
        .substr(0, 19);
      return transaction;
    });
  }

  get transactionTableColumns(): string[] {
    return ['createdAt', 'currencyShortName', 'id', 'amount', 'fee', 'address'];
  }

  getTransactionHeaderFromColumn(column: string): string {
    switch (column) {
      case 'createdAt':
        return 'Time';
      case 'currencyShortName':
        return 'Currency';
      case 'id':
        return 'ID';
      case 'amount':
        return 'Amount';
      case 'fee':
        return 'Fee';
      case 'address':
        return 'Address';
    }
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
