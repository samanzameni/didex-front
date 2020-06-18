import {
  Component,
  OnInit,
  ViewChild,
  ViewChildren,
  QueryList,
  AfterViewInit,
} from '@angular/core';
import {
  Order,
  Trade,
  OrderSide,
  Transaction,
  TransactionType,
} from '@core/models';
import {
  OrderDATAService,
  TradeDATAService,
  FilledOrderDATAService,
  PrivateTradeDATAService,
  TransactionsDATAService,
} from '@core/services/DATA';
import Decimal from 'decimal.js';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { CONSTANTS } from '@core/util/constants';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'ddx-reports',
  templateUrl: './ddx-reports.component.html',
  styleUrls: [
    '../../../public/ddx-account-pages.scss',
    './ddx-reports.component.scss',
  ],
})
export class ReportsPageComponent implements OnInit, AfterViewInit {
  private orders: any[];
  private trades: any[];
  private transactions: any[];

  private currentActivePane: string;

  private ordersDataSource: MatTableDataSource<any>;
  private ordersPaginator: MatPaginator;

  private tradesDataSource: MatTableDataSource<any>;
  private tradesPaginator: MatPaginator;

  private transactionsDataSource: MatTableDataSource<any>;
  private transactionsPaginator: MatPaginator;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private orderDataService: FilledOrderDATAService,
    private tradeDataService: PrivateTradeDATAService,
    private transactionsDataService: TransactionsDATAService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.activatePane('orders');
  }

  ngAfterViewInit(): void {
    this.orderDataService.dataStream$.subscribe((data) => {
      this.orders = (data || []).map((order) => {
        const mapped: any = { ...order };
        mapped.createdAt = this.datePipe.transform(order.createdAt, 'short');
        mapped.side = OrderSide[order.side];
        mapped.execAmount = `${order.executedQuantity}/${order.quantity}`;
        mapped.total = this.getTotalPrice(order);
        return mapped;
      });
      this.ordersDataSource = new MatTableDataSource(this.orders);
      this.activatePane(this.currentActivePane);
    });
    this.orderDataService.updateData();

    this.tradeDataService.dataStream$.subscribe((data) => {
      this.trades = (data || []).map((trade) => {
        const t: any = { ...trade };
        t.timeStamp = this.datePipe.transform(trade.timeStamp, 'short');
        t.side = OrderSide[trade.side];
        return t;
      });
      this.tradesDataSource = new MatTableDataSource(this.trades);
      this.activatePane(this.currentActivePane);
    });
    this.tradeDataService.updateData();

    this.transactionsDataService.dataStream$.subscribe((data) => {
      this.transactions = (data || []).map((transaction) => {
        const t: any = { ...transaction };
        t.createdAt = this.datePipe.transform(transaction.createdAt, 'short');
        t.type = TransactionType[transaction.type];
        return t;
      });
      this.transactionsDataSource = new MatTableDataSource(this.transactions);
      this.activatePane(this.currentActivePane);
    });
    this.transactionsDataService.updateData();
  }

  get pageSizeOptions(): number[] {
    return [
      CONSTANTS.PAGINATION_LIMIT_SMALL,
      CONSTANTS.PAGINATION_LIMIT,
      CONSTANTS.PAGINATION_LIMIT_BIG,
    ];
  }

  get orderData(): MatTableDataSource<any> {
    return this.ordersDataSource;
  }

  get orderTableColumns(): string[] {
    return [
      'createdAt',
      'marketSymbol',
      'id',
      'side',
      'price',
      'execAmount',
      'total',
    ];
  }

  getOrderHeaderFromColumn(column: string): string {
    switch (column) {
      case 'createdAt':
        return 'Time';
      case 'marketSymbol':
        return 'Symbol';
      case 'id':
        return 'ID';
      case 'side':
        return 'Side';
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

  get tradeData(): MatTableDataSource<any> {
    return this.tradesDataSource;
  }

  get tradeTableColumns(): string[] {
    return [
      'timeStamp',
      'marketSymbol',
      'id',
      'side',
      'volume',
      'price',
      'volumeInQoute',
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
      case 'volumeInQoute':
        return 'Total';
      case 'fee':
        return 'Fee';
      default:
        return '';
    }
  }

  get transactionsData(): MatTableDataSource<any> {
    return this.transactionsDataSource;
  }

  get transactionTableColumns(): string[] {
    return [
      'createdAt',
      'type',
      'currencyShortName',
      'transactionId',
      'hash',
      'amount',
      'fee',
      'address',
    ];
  }

  getTransactionHeaderFromColumn(column: string): string {
    switch (column) {
      case 'createdAt':
        return 'Time';
      case 'type':
        return 'Type';
      case 'currencyShortName':
        return 'Currency';
      case 'transactionId':
        return 'ID';
      case 'hash':
        return 'Hash';
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
    switch (newPane) {
      case 'orders':
        if (this.ordersDataSource) {
          this.ordersDataSource.paginator = this.paginator;
        }
        break;
      case 'trades':
        if (this.tradesDataSource) {
          this.tradesDataSource.paginator = this.paginator;
        }
        break;
      case 'transactions':
        if (this.transactionsDataSource) {
          this.transactionsDataSource.paginator = this.paginator;
        }
        break;
    }
  }

  getPriceCellCSSClass(row: Trade): string {
    return row.side === OrderSide.Buy ? 'green' : 'red';
  }

  getTotalPrice(order: Order): Decimal {
    return new Decimal(order.price).mul(order.quantity);
  }
}
