import { OrderSide } from './ddx-order.model';

export interface Trade {
  id: number;
  volume: number;
  volumeInQoute: number;
  price: number;
  timeStamp: string;
  side: OrderSide;
}
