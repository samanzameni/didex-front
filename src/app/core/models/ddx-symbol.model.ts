export interface TradeSymbol {
  baseCurrencyShortName: string;
  quoteCurrencyShortName: string;
  quantityIncrement: number;
  tickSize: number;
  takeLiquidityRate: number;
  provideLiquidityRate: number;
  feeSide: number;
}
