import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SymbolDATAService } from '@core/services/DATA';
import { TradeSymbol } from '@core/models';

@Component({
  selector: 'ddx-instruments',
  templateUrl: './ddx-instruments.component.html',
  styleUrls: ['./ddx-instruments.component.scss'],
})
export class InstrumentsComponent implements OnInit {
  private baseCurrencyList: string[];
  private currentActiveBaseCurrency: string;

  @Output() baseCurrencyChange: EventEmitter<string>;

  constructor(private dataService: SymbolDATAService) {
    this.baseCurrencyList = ['BTC', 'ETH', 'USDT']; // TODO
    this.currentActiveBaseCurrency = 'BTC';
    this.baseCurrencyChange = new EventEmitter();
  }

  ngOnInit() {
    this.baseCurrencyChange.emit(this.currentActiveBaseCurrency);
    this.dataService.updateData();
    this.dataService.dataStream$.subscribe(data => {
      console.log(data);
    });
  }

  get activeBaseCurrency(): string {
    return this.currentActiveBaseCurrency;
  }

  get baseCurrencies(): string[] {
    // return this.baseCurrencyList;
    return this.mockData
      .map(item => item.baseCurrencyShortName)
      .filter((currency, i, self) => self.indexOf(currency) === i);
  }

  get mockTableData(): TradeSymbol[] {
    return this.mockData.filter(
      item => item.baseCurrencyShortName === this.currentActiveBaseCurrency
    );
  }

  get mockData(): TradeSymbol[] {
    return [
      {
        baseCurrencyShortName: 'BTC',
        quoteCurrencyShortName: 'ETH',
        quantityIncrement: 10,
        tickSize: 20,
        takeLiquidityRate: 30,
        provideLiquidityRate: 40,
        feeSide: 50,
      },
      {
        baseCurrencyShortName: 'BTC',
        quoteCurrencyShortName: 'USDT',
        quantityIncrement: 10,
        tickSize: 20,
        takeLiquidityRate: 30,
        provideLiquidityRate: 40,
        feeSide: 50,
      },
      {
        baseCurrencyShortName: 'BTC',
        quoteCurrencyShortName: 'IRR',
        quantityIncrement: 10,
        tickSize: 20,
        takeLiquidityRate: 30,
        provideLiquidityRate: 40,
        feeSide: 50,
      },
      {
        baseCurrencyShortName: 'ETH',
        quoteCurrencyShortName: 'BTC',
        quantityIncrement: 10,
        tickSize: 20,
        takeLiquidityRate: 30,
        provideLiquidityRate: 40,
        feeSide: 50,
      },
      {
        baseCurrencyShortName: 'ETH',
        quoteCurrencyShortName: 'IRR',
        quantityIncrement: 10,
        tickSize: 20,
        takeLiquidityRate: 30,
        provideLiquidityRate: 40,
        feeSide: 50,
      },
      {
        baseCurrencyShortName: 'IRR',
        quoteCurrencyShortName: 'USDT',
        quantityIncrement: 10,
        tickSize: 20,
        takeLiquidityRate: 30,
        provideLiquidityRate: 40,
        feeSide: 50,
      },
    ];
  }

  activateBaseCurrency(newBaseCurrency: string): void {
    this.currentActiveBaseCurrency = newBaseCurrency;
    this.baseCurrencyChange.emit(this.currentActiveBaseCurrency);
  }
}
