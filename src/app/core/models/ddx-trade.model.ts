import { OrderSide } from './ddx-order.model';

export interface Trade {
  id: number;
  marketSymbol?: string;
  volume: number;
  volumeInQoute: number;
  price: number;
  timeStamp: string;
  side: OrderSide;
  fee?: number;
}
