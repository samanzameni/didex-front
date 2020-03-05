import { Component, OnInit } from '@angular/core';
import {
  TradeSymbol,
  TradeTicker,
  TradeBalance,
  TradeOrder,
  OrderBookResponse,
} from '@core/models';
import {
  SymbolDATAService,
  BalanceDATAService,
  OrderBookDATAService,
  TickerDATAService,
} from '@core/services/DATA';

@Component({
  selector: 'ddx-home-page',
  templateUrl: './ddx-home-page.component.html',
  styleUrls: ['./ddx-home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  private currentActiveSymbol: TradeSymbol;

  private symbols: TradeSymbol[];
  private ticker: TradeTicker[];
  private balance: TradeBalance[];
  private orderBook: OrderBookResponse;

  constructor(
    private symbolDataService: SymbolDATAService,
    private tickerDataService: TickerDATAService,
    private balanceDataService: BalanceDATAService,
    private orderBookDataService: OrderBookDATAService
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

    this.balanceDataService.dataStream$.subscribe(data => {
      this.balance = data || [];
    });
    this.balanceDataService.updateData();

    this.orderBookDataService.dataStream$.subscribe(data => {
      this.orderBook = data || { bid: [], ask: [] };
    });
  }

  handleSymbolChange(symbol: TradeSymbol): void {
    this.currentActiveSymbol = symbol;

    this.orderBookDataService.updateData(symbol.symbol);
    this.orderBookDataService.updateFeed(symbol.symbol);
  }

  get activeSymbol(): TradeSymbol {
    return this.currentActiveSymbol;
  }

  get symbolsData(): TradeSymbol[] {
    return this.symbols || [];
  }

  get tickerData(): TradeTicker[] {
    return this.ticker || [];
  }

  get balanceData(): TradeBalance[] {
    return this.balance || [];
  }

  get orderBookData(): OrderBookResponse {
    return this.orderBook || { bid: [], ask: [] };
  }
}
