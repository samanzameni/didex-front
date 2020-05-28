import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
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
  private currentActiveQuoteCurrency: string;
  private currentActiveSymbol: TradeSymbol;

  @Input() symbolsData: TradeSymbol[];
  @Input() tickerData: Ticker[];

  @Output() baseCurrencyChange: EventEmitter<string>;
  @Output() quoteCurrencyChange: EventEmitter<string>;
  @Output() symbolChange: EventEmitter<TradeSymbol>;

  constructor() {
    this.baseCurrencyChange = new EventEmitter();
    this.quoteCurrencyChange = new EventEmitter();
    this.symbolChange = new EventEmitter();
    this.symbolsData = [];
    this.tickerData = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.symbolsData &&
      this.symbolsData &&
      this.symbolsData.length > 0
    ) {
      if (
        !this.isSameSymbolData(
          changes.symbolsData.currentValue,
          changes.symbolsData.previousValue
        )
      ) {
        this.currentActiveBaseCurrency = this.symbolsData[0].baseCurrencyShortName;
        this.currentActiveQuoteCurrency = this.symbolsData[0].quoteCurrencyShortName;
        this.activateBaseCurrency(this.currentActiveBaseCurrency);
        this.activateQuoteCurrency(this.currentActiveQuoteCurrency);
        this.activateSymbol(this.symbolsData[0]);
      }
    }
  }

  private isSameSymbolData(a: TradeSymbol[], b: TradeSymbol[]): boolean {
    if (!!a) {
      if (!b) {
        return false;
      }

      if (a.length !== b.length) {
        return false;
      }

      for (let i = 0; i < a.length; i++) {
        if (!this.isSameSymbol(a[i], b[i])) {
          return false;
        }
      }

      return true;
    }

    return !b;
  }

  private isSameSymbol(a: TradeSymbol, b: TradeSymbol): boolean {
    if (!!a) {
      if (!b) {
        return false;
      }

      for (const key of Object.keys(a)) {
        if (a[key] !== b[key]) {
          return false;
        }
      }

      return true;
    }

    return !b;
  }

  get activeBaseCurrency(): string {
    return this.currentActiveBaseCurrency;
  }

  get activeQuoteCurrency(): string {
    return this.currentActiveQuoteCurrency;
  }

  get activeSymbol(): TradeSymbol {
    return this.currentActiveSymbol;
  }

  get baseCurrencies(): string[] {
    return this.data
      .map((item) => item.baseCurrencyShortName)
      .filter((currency, i, self) => self.indexOf(currency) === i);
  }

  get quoteCurrencies(): string[] {
    return this.data
      .map((item) => item.quoteCurrencyShortName)
      .filter((currency, i, self) => self.indexOf(currency) === i);
  }

  get tableData(): TradeSymbol[] {
    return this.data.filter(
      (item) => item.quoteCurrencyShortName === this.currentActiveQuoteCurrency
    );
  }

  get data(): TradeSymbol[] {
    return this.symbolsData;
  }

  getTickerDataFromSymbol(symbol: TradeSymbol): Ticker {
    return getTickerFromSymbol(this.tickerData, symbol);
  }

  getTickerChange(symbol: TradeSymbol): number {
    const close = this.getTickerDataFromSymbol(symbol)
      ? this.getTickerDataFromSymbol(symbol).close
      : 0;
    const open = this.getTickerDataFromSymbol(symbol)
      ? this.getTickerDataFromSymbol(symbol).open
      : 0;

    return open === 0 ? 0 : ((close - open) / open) * 100;
  }

  activateBaseCurrency(newBaseCurrency: string): void {
    this.currentActiveBaseCurrency = newBaseCurrency;
    this.baseCurrencyChange.emit(this.currentActiveBaseCurrency);
  }

  activateQuoteCurrency(newQuoteCurrency: string): void {
    this.currentActiveQuoteCurrency = newQuoteCurrency;
    this.quoteCurrencyChange.emit(this.currentActiveQuoteCurrency);
  }

  activateSymbol(newSymbol: TradeSymbol): void {
    this.currentActiveSymbol = newSymbol;
    this.symbolChange.emit(newSymbol);
  }
}
