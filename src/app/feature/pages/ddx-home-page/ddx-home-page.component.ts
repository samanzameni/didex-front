import { Component, OnInit } from '@angular/core';
import { TradeSymbol, TradeTicker, TradeBalance } from '@core/models';
import { SymbolDATAService, BalanceDATAService } from '@core/services/DATA';

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

  constructor(
    private symbolDataService: SymbolDATAService,
    private balanceDataService: BalanceDATAService
  ) {}

  ngOnInit() {
    this.symbolDataService.updateData();
    this.symbolDataService.dataStream$.subscribe(data => {
      this.symbols = data.symbol;
      this.ticker = data.ticker;
    });

    this.balanceDataService.updateData();
    this.balanceDataService.dataStream$.subscribe(data => {
      this.balance = data;
    });
  }

  handleSymbolChange(symbol: TradeSymbol): void {
    this.currentActiveSymbol = symbol;
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
}
