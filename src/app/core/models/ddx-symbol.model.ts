export interface TradeSymbol {
  symbol: string;
  baseCurrencyShortName: string;
  quoteCurrencyShortName: string;
  quantityIncrement: number; // amount
  tickSize: number; // limit
  takeLiquidityRate: number; // taker fee // * 100
  provideLiquidityRate: number; // maker fee // * 100
  feeSide: SymbolFeeSide;
}

export enum SymbolFeeSide {
  Base = 0,
  Quote = 1,
}

export interface SymbolExternalSource {
  symbol: string;
  first: string;
  second: string;
  source: string;
}
