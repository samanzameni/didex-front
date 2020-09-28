import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  TradeSymbol,
  Ticker,
  Balance,
  Order,
  OrderBookResponse,
  Trade,
  SymbolExternalSource,
  Trader,
  OrderClickEventData,
} from '@core/models';
import {
  SymbolDATAService,
  BalanceDATAService,
  OrderBookDATAService,
  TickerDATAService,
  TradeDATAService,
  OrderDATAService,
  PrivateTradeDATAService,
  FilledOrderDATAService,
  BankingDATAService,
} from '@core/services/DATA';
import { PublicRESTService } from '@core/services/REST';
import { TraderService, AuthService, DirectionService } from '@core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'ddx-home-page',
  templateUrl: './ddx-home-page.component.html',
  styleUrls: ['./ddx-home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  private currentActiveSymbol: TradeSymbol;
  private currentActiveOrder: OrderClickEventData;

  private externalSources: SymbolExternalSource[];

  private symbols: TradeSymbol[];
  private ticker: Ticker[];
  private balance: Balance[];
  private bankingBalance: Balance[];
  private orderBook: OrderBookResponse;
  private order: Order[];
  private trade: Trade[];
  private privateTrade: Trade[];
  private filledOrder: Order[];

  private timesAndSalesPageNumber: number;
  private activeOrdersPageNumber: number;
  private filledAndCanceledPageNumber: number;
  private tradesPageNumber: number;

  constructor(
    private cdRef: ChangeDetectorRef,
    private traderService: TraderService,
    private authService: AuthService,
    private publicService: PublicRESTService,
    private symbolDataService: SymbolDATAService,
    private tickerDataService: TickerDATAService,
    private balanceDataService: BalanceDATAService,
    private orderBookDataService: OrderBookDATAService,
    private orderDataService: OrderDATAService,
    private tradeDataService: TradeDATAService,
    private privateTradeDataService: PrivateTradeDATAService,
    private filledOrderDataService: FilledOrderDATAService,
    private bankingDataService: BankingDATAService,
    private directionService: DirectionService
  ) {
    this.externalSources = [];
    publicService.requestSymbolSources().subscribe((response) => {
      this.externalSources = response || [];
    });

    this.timesAndSalesPageNumber = 1;
    this.activeOrdersPageNumber = 1;
    this.filledAndCanceledPageNumber = 1;
    this.tradesPageNumber = 1;
  }

  ngOnInit() {
    this.symbolDataService.dataStream$.subscribe((data) => {
      this.symbols = data || [];
    });
    this.symbolDataService.updateData();

    this.tickerDataService.dataStream$.subscribe((data) => {
      this.ticker = data || [];
    });
    this.tickerDataService.updateData();
    this.tickerDataService.updateFeed();

    this.orderBookDataService.dataStream$.subscribe((data) => {
      this.orderBook = data || { bid: [], ask: [] };
    });

    this.orderDataService.dataStream$.subscribe((data) => {
      this.order = data || [];
    });

    this.tradeDataService.dataStream$.subscribe((data) => {
      this.trade = data || [];
    });

    if (this.authService.isAuthorized) {
      this.balanceDataService.dataStream$.subscribe((data) => {
        this.balance = data || [];
      });
      this.balanceDataService.updateData();

      this.bankingDataService.dataStream$.subscribe((data) => {
        this.bankingBalance = data || [];
      });
      this.bankingDataService.updateData();

      this.privateTradeDataService.dataStream$.subscribe((data) => {
        this.privateTrade = data || [];
      });

      this.filledOrderDataService.dataStream$.subscribe((data) => {
        this.filledOrder = data || [];
      });
    }
  }

  handleSymbolChange(symbol: TradeSymbol): void {
    this.currentActiveSymbol = symbol;
    this.cdRef.detectChanges();

    this.orderBookDataService.updateData(symbol.symbol);
    this.orderBookDataService.updateFeed(symbol.symbol);

    this.tradeDataService.updateData(
      symbol.symbol,
      this.timesAndSalesPageNumber
    );
    this.tradeDataService.updateFeed(symbol.symbol);

    this.orderDataService.updateData(symbol.symbol);
    this.orderDataService.updateFeed(symbol.symbol);

    if (this.authService.isAuthorized) {
      this.privateTradeDataService.updateData(symbol.symbol);
      this.privateTradeDataService.updateFeed(symbol.symbol);

      this.filledOrderDataService.updateData(symbol.symbol);
      this.filledOrderDataService.updateFeed(symbol.symbol);
    }
  }

  handleOrderChange(order: OrderClickEventData): void {
    this.currentActiveOrder = order;
    this.cdRef.detectChanges();
  }

  get activeSymbol(): TradeSymbol {
    return this.currentActiveSymbol;
  }

  get activeOrder(): OrderClickEventData {
    return this.currentActiveOrder;
  }

  get symbolExternalSources(): SymbolExternalSource[] {
    return this.externalSources;
  }

  get symbolsData(): TradeSymbol[] {
    return this.symbols || [];
  }

  get tickerData(): Ticker[] {
    return this.ticker || [];
  }

  get balanceData(): Balance[] {
    return this.balance || [];
  }

  get bankingBalanceData(): Balance[] {
    return this.bankingBalance || [];
  }

  get orderBookData(): OrderBookResponse {
    return this.orderBook || { bid: [], ask: [] };
  }

  get tradeData(): Trade[] {
    return this.trade || [];
  }

  get privateTradeData(): Trade[] {
    return this.privateTrade || [];
  }

  get orderData(): Order[] {
    return this.order || [];
  }

  get filledOrderData(): Order[] {
    return this.filledOrder || [];
  }

  get currentTrader(): Trader {
    return this.traderService.currentTrader;
  }

  get isAuthorized(): boolean {
    return this.authService.isAuthorized;
  }

  get direction$(): Observable<string> {
    return this.directionService.direction$;
  }

  loadNextPageForTimeAndSales(): void {
    this.timesAndSalesPageNumber++;
    this.tradeDataService.updateData(this.currentActiveSymbol.symbol, {
      page: this.timesAndSalesPageNumber,
    });
  }

  loadNextPageForActiveOrders(): void {
    this.activeOrdersPageNumber++;
    this.orderDataService.updateData(this.currentActiveSymbol.symbol, {
      page: this.activeOrdersPageNumber,
    });
  }

  loadNextPageForFilledAndCanceled(): void {
    this.filledAndCanceledPageNumber++;
    this.filledOrderDataService.updateData(this.currentActiveSymbol.symbol, {
      page: this.filledAndCanceledPageNumber,
    });
  }

  loadNextPageForTrades(): void {
    this.tradesPageNumber++;
    this.privateTradeDataService.updateData(this.currentActiveSymbol.symbol, {
      page: this.tradesPageNumber,
    });
  }
}
