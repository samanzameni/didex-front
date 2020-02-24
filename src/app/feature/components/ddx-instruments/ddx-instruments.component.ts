import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SymbolDATAService } from '@core/services/DATA';
import { TradeSymbol, SymbolTickerData, TradeTicker } from '@core/models';

@Component({
  selector: 'ddx-instruments',
  templateUrl: './ddx-instruments.component.html',
  styleUrls: ['./ddx-instruments.component.scss'],
})
export class InstrumentsComponent implements OnInit {
  private currentActiveBaseCurrency: string;
  private symbolsData: TradeSymbol[];
  private tickersData: TradeTicker[];
  private instrumentsData: SymbolTickerData;

  @Output() baseCurrencyChange: EventEmitter<string>;
  @Output() symbolChange: EventEmitter<TradeSymbol>;

  constructor(private dataService: SymbolDATAService) {
    this.baseCurrencyChange = new EventEmitter();
    this.symbolChange = new EventEmitter();
    this.symbolsData = [];
    this.tickersData = [];
    // this.initMockData(); // TODO
  }

  ngOnInit() {
    this.dataService.updateData();
    this.dataService.dataStream$.subscribe(data => {
      // this.symbolsData = Array.from(data);
      this.instrumentsData = data;
      this.symbolsData = data.symbol;
      this.tickersData = data.ticker;
      if (this.symbolsData && this.symbolsData.length > 0) {
        this.currentActiveBaseCurrency = this.symbolsData[0].baseCurrencyShortName;
        this.baseCurrencyChange.emit(this.currentActiveBaseCurrency);
        this.symbolChange.emit(this.symbolsData[0]);
      }
    });
  }

  get activeBaseCurrency(): string {
    return this.currentActiveBaseCurrency;
  }

  get baseCurrencies(): string[] {
    // return this.baseCurrencyList;
    return this.data
      .map(item => item.baseCurrencyShortName)
      .filter((currency, i, self) => self.indexOf(currency) === i);
  }

  get tableData(): TradeSymbol[] {
    return this.data.filter(
      item => item.baseCurrencyShortName === this.currentActiveBaseCurrency
    );
  }

  get data(): TradeSymbol[] {
    return this.symbolsData;
  }

  getTickerDataFromSymbol(symbol: TradeSymbol): TradeTicker {
    const filtered: TradeTicker[] = this.tickersData.filter(
      sData => sData.symbol === symbol.symbol
    );
    if (filtered.length < 1) {
      return null;
    }

    return filtered[0];
  }

  activateBaseCurrency(newBaseCurrency: string): void {
    this.currentActiveBaseCurrency = newBaseCurrency;
    this.baseCurrencyChange.emit(this.currentActiveBaseCurrency);
  }

  activateSymbol(newSymbol: TradeSymbol): void {
    this.symbolChange.emit(newSymbol);
  }
}
