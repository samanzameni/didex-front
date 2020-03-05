import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnChanges,
} from '@angular/core';
import { TradeSymbol, Ticker } from '@core/models';
import { getTickerFromSymbol } from '@core/util/ticker';

@Component({
  selector: 'ddx-instruments',
  templateUrl: './ddx-instruments.component.html',
  styleUrls: [
    '../../public/ddx-homepage-tables.scss',
    './ddx-instruments.component.scss',
  ],
})
export class InstrumentsComponent implements OnChanges {
  private currentActiveBaseCurrency: string;

  @Input() symbolsData: TradeSymbol[];
  @Input() tickerData: Ticker[];

  @Output() baseCurrencyChange: EventEmitter<string>;
  @Output() symbolChange: EventEmitter<TradeSymbol>;

  constructor() {
    this.baseCurrencyChange = new EventEmitter();
    this.symbolChange = new EventEmitter();
    this.symbolsData = [];
    this.tickerData = [];
  }

  ngOnChanges() {
    if (this.symbolsData && this.symbolsData.length > 0) {
      this.currentActiveBaseCurrency = this.symbolsData[0].baseCurrencyShortName;
      this.baseCurrencyChange.emit(this.currentActiveBaseCurrency);
      this.symbolChange.emit(this.symbolsData[0]);
    }
  }

  get activeBaseCurrency(): string {
    return this.currentActiveBaseCurrency;
  }

  get baseCurrencies(): string[] {
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

  getTickerDataFromSymbol(symbol: TradeSymbol): Ticker {
    return getTickerFromSymbol(this.tickerData, symbol);
  }

  getTickerChange(symbol: TradeSymbol): number {
    const close = this.getTickerDataFromSymbol(symbol).close;
    const open = this.getTickerDataFromSymbol(symbol).open;

    return open === 0 ? 0 : ((close - open) / open) * 100;
  }

  activateBaseCurrency(newBaseCurrency: string): void {
    this.currentActiveBaseCurrency = newBaseCurrency;
    this.baseCurrencyChange.emit(this.currentActiveBaseCurrency);
  }

  activateSymbol(newSymbol: TradeSymbol): void {
    this.symbolChange.emit(newSymbol);
  }
}
