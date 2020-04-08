import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  TradeSymbol,
  Ticker,
  Balance,
  Order,
  OrderBookResponse,
  Trade,
  SymbolExternalSource,
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
} from '@core/services/DATA';
import { PublicRESTService } from '@core/services/REST';

@Component({
  selector: 'ddx-home-page',
  templateUrl: './ddx-home-page.component.html',
  styleUrls: ['./ddx-home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  private currentActiveSymbol: TradeSymbol;

  private externalSources: SymbolExternalSource[];

  private symbols: TradeSymbol[];
  private ticker: Ticker[];
  private balance: Balance[];
  private orderBook: OrderBookResponse;
  private order: Order[];
  private trade: Trade[];
  private privateTrade: Trade[];
  private filledOrder: Order[];

  constructor(
    private cdRef: ChangeDetectorRef,
    private publicService: PublicRESTService,
    private symbolDataService: SymbolDATAService,
    private tickerDataService: TickerDATAService,
    private balanceDataService: BalanceDATAService,
    private orderBookDataService: OrderBookDATAService,
    private orderDataService: OrderDATAService,
    private tradeDataService: TradeDATAService,
    private privateTradeDataService: PrivateTradeDATAService,
    private filledOrderDataService: FilledOrderDATAService
  ) {
    this.externalSources = [];
    publicService.requestSymbolSources().subscribe((response) => {
      this.externalSources = response || [];
    });
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

    this.balanceDataService.dataStream$.subscribe((data) => {
      this.balance = data || [];
    });
    this.balanceDataService.updateData();

    this.orderBookDataService.dataStream$.subscribe((data) => {
      this.orderBook = data || { bid: [], ask: [] };
    });

    this.orderDataService.dataStream$.subscribe((data) => {
      this.order = data || [];
    });

    this.tradeDataService.dataStream$.subscribe((data) => {
      this.trade = data || [];
    });

    this.privateTradeDataService.dataStream$.subscribe((data) => {
      this.privateTrade = data || [];
    });

    this.filledOrderDataService.dataStream$.subscribe((data) => {
      this.filledOrder = data || [];
    });
  }

  handleSymbolChange(symbol: TradeSymbol): void {
    this.currentActiveSymbol = symbol;
    this.cdRef.detectChanges();

    this.orderBookDataService.updateData(symbol.symbol);
    this.orderBookDataService.updateFeed(symbol.symbol);

    this.tradeDataService.updateData(symbol.symbol);
    this.tradeDataService.updateFeed(symbol.symbol);

    this.orderDataService.updateData(symbol.symbol);
    this.orderDataService.updateFeed(symbol.symbol);

    this.privateTradeDataService.updateData(symbol.symbol);
    this.privateTradeDataService.updateFeed(symbol.symbol);

    this.filledOrderDataService.updateData(symbol.symbol);
    this.filledOrderDataService.updateFeed(symbol.symbol);
  }

  get activeSymbol(): TradeSymbol {
    return this.currentActiveSymbol;
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
}
