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
  TransactionStatus,
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
import { LocalePipe } from '@widget/pipes/ddx-locale.pipe';

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

  private tradesDataSource: MatTableDataSource<any>;

  private transactionsDataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private orderDataService: FilledOrderDATAService,
    private tradeDataService: PrivateTradeDATAService,
    private transactionsDataService: TransactionsDATAService,
    private datePipe: DatePipe,
    private localePipe: LocalePipe
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
        t.status = TransactionStatus[transaction.status];
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
        return this.localePipe.transform('reports.orders.createdAt');
      case 'marketSymbol':
        return this.localePipe.transform('reports.orders.marketSymbol');
      case 'id':
        return this.localePipe.transform('reports.orders.id');
      case 'side':
        return this.localePipe.transform('reports.orders.side');
      case 'price':
        return this.localePipe.transform('reports.orders.price');
      case 'execAmount':
        return this.localePipe.transform('reports.orders.execAmount');
      case 'total':
        return this.localePipe.transform('reports.orders.total');
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
        return this.localePipe.transform('reports.trades.timeStamp');
      case 'marketSymbol':
        return this.localePipe.transform('reports.trades.marketSymbol');
      case 'id':
        return this.localePipe.transform('reports.trades.id');
      case 'side':
        return this.localePipe.transform('reports.trades.side');
      case 'volume':
        return this.localePipe.transform('reports.trades.volume');
      case 'price':
        return this.localePipe.transform('reports.trades.price');
      case 'volumeInQoute':
        return this.localePipe.transform('reports.trades.volumeInQuote');
      case 'fee':
        return this.localePipe.transform('reports.trades.fee');
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
      'status',
    ];
  }

  getTransactionHeaderFromColumn(column: string): string {
    switch (column) {
      case 'createdAt':
        return this.localePipe.transform('reports.transactions.createdAt');
      case 'type':
        return this.localePipe.transform('reports.transactions.type');
      case 'currencyShortName':
        return this.localePipe.transform(
          'reports.transactions.currencyShortName'
        );
      case 'transactionId':
        return this.localePipe.transform('reports.transactions.transactionId');
      case 'hash':
        return this.localePipe.transform('reports.transactions.hash');
      case 'amount':
        return this.localePipe.transform('reports.transactions.amount');
      case 'fee':
        return this.localePipe.transform('reports.transactions.fee');
      case 'address':
        return this.localePipe.transform('reports.transactions.address');
      case 'status':
        return this.localePipe.transform('reports.transactions.status');
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
