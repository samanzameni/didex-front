import { Component, OnInit } from '@angular/core';
import {
  TradeSymbol,
  Ticker,
  Balance,
  TradeOrder,
  OrderBookResponse,
  Trade,
} from '@core/models';
import {
  SymbolDATAService,
  BalanceDATAService,
  OrderBookDATAService,
  TickerDATAService,
  TradeDATAService,
} from '@core/services/DATA';

@Component({
  selector: 'ddx-home-page',
  templateUrl: './ddx-home-page.component.html',
  styleUrls: ['./ddx-home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  private currentActiveSymbol: TradeSymbol;

  private symbols: TradeSymbol[];
  private ticker: Ticker[];
  private balance: Balance[];
  private orderBook: OrderBookResponse;
  private trade: Trade[];

  constructor(
    private symbolDataService: SymbolDATAService,
    private tickerDataService: TickerDATAService,
    private balanceDataService: BalanceDATAService,
    private orderBookDataService: OrderBookDATAService,
    private tradeDataService: TradeDATAService
  ) {}

  ngOnInit() {
    this.symbolDataService.dataStream$.subscribe(data => {
      this.symbols = data || [];
    });
    this.symbolDataService.updateData();

    this.tickerDataService.dataStream$.subscribe(data => {
      this.ticker = data || [];
    });
    this.tickerDataService.updateData();
    this.tickerDataService.updateFeed();

    this.balanceDataService.dataStream$.subscribe(data => {
      this.balance = data || [];
    });
    this.balanceDataService.updateData();

    this.orderBookDataService.dataStream$.subscribe(data => {
      this.orderBook = data || { bid: [], ask: [] };
    });

    this.tradeDataService.dataStream$.subscribe(data => {
      this.trade = data || [];
    });
  }

  handleSymbolChange(symbol: TradeSymbol): void {
    this.currentActiveSymbol = symbol;

    this.orderBookDataService.updateData(symbol.symbol);
    this.orderBookDataService.updateFeed(symbol.symbol);

    this.tradeDataService.updateData(symbol.symbol);
    this.tradeDataService.updateFeed(symbol.symbol);
  }

  get activeSymbol(): TradeSymbol {
    return this.currentActiveSymbol;
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
}
