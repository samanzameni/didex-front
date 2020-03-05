export interface Ticker {
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

// change: close - open / open
