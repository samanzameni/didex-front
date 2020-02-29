export interface TradeSymbol {
  symbol: string;
  baseCurrencyShortName: string;
  quoteCurrencyShortName: string;
  quantityIncrement: number;
  tickSize: number;
  takeLiquidityRate: number;
  provideLiquidityRate: number;
  feeSide: number;
}

export interface TradeTicker {
  symbol: string;
  ask: number;
  bid: number;
  last: number; // price
  low: number;
  high: number;
  open: number;
  volume: number; // volume
  volumeInQuote: number;
  timeStamp: string;
}

// balanceBuy: quote Sell: base

export interface SymbolTickerData {
  symbol: TradeSymbol[];
  ticker: TradeTicker[];
}
