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

export interface TradeTicker {
  symbol: string;
  ask: number;
  bid: number;
  close: number; // price
  low: number;
  high: number;
  open: number;
  volume: number; // volume
  volumeInQuote: number;
  timeStamp: string;
}

// balanceBuy: quote Sell: base
// change: close - open / open

export interface SymbolTickerData {
  symbol: TradeSymbol[];
  ticker: TradeTicker[];
}

export enum SymbolFeeSide {
  Base = 0,
  Quote = 1,
}
