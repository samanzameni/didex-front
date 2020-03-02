import { TradeTicker, TradeSymbol } from '@core/models';

export function getTickerFromSymbol(
  tickerData: TradeTicker[],
  symbol: TradeSymbol
): TradeTicker {
  const filtered: TradeTicker[] = tickerData.filter(
    sData => sData.symbol === symbol.symbol
  );
  if (filtered.length < 1) {
    return null;
  }

  return filtered[0];
}
