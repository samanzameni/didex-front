import { Ticker, TradeSymbol } from '@core/models';

export function getTickerFromSymbol(
  tickerData: Ticker[],
  symbol: TradeSymbol
): Ticker {
  const filtered: Ticker[] = tickerData.filter(
    sData => sData.symbol === symbol.symbol
  );
  if (filtered.length < 1) {
    return null;
  }

  return filtered[0];
}
