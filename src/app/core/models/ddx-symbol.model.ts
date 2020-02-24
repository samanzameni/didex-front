export interface TradeSymbol {
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
  last: number;
  low: number;
  high: number;
  open: number;
  volume: number;
  volumeInQuote: number;
  timeStamp: string;
}

export interface SymbolTickerData {
  symbol: TradeSymbol[];
  ticker: TradeTicker[];
}
