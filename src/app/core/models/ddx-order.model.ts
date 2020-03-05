export interface TradeOrder {
  id: number;
  marketSymbol: string;
  side: OrderSide;
  status: OrderStatus;
  type: OrderType;
  timeInForce: OrderTimeInForce;
  quantity: number;
  price: number;
  executedQuantity: number;
  createdAt: string;
  updatedAt: string;
  stopPrice: number;
  postOnly: boolean;
  expireTime: string;
}

export interface OrderBookRecord {
  id: number;
  price: number;
  volume: number;
}

export interface OrderBookResponse {
  bid: OrderBookRecord[];
  ask: OrderBookRecord[];
}

export interface PublicOrderFeed {
  id: number;
  price: number;
  quantity: number;
  side: OrderSide;
  status: OrderStatus;
  timeStamp: string;
}

export interface OrderData {
  marketSymbol: string;
  side: OrderSide;
  type: OrderType;
  quantity: number; // amount
  timeInForce?: OrderTimeInForce; // limit (dropdown)
  price?: number; // limit (limit input)
  stopPrice?: number; // NO NEED
  postOnly?: boolean; // limit (check)
  expireTime?: string; // if TmieInFor === 5 then show (NO NEED FOR NOW)
}

export enum OrderSide {
  Buy = 0,
  Sell = 1,
}

export enum OrderStatus {
  New = 0, // ADD
  PartiallyFilled = 1, // UPDATE or ADD
  Filled = 2, // REMOVE or NOT ANYTHING
  Canceled = 3, // REMOVE or NOT ANYTHING
  Expired = 4,
  Suspended = 5,
}

export enum OrderType {
  Market = 1,
  Limit = 2,
  StopMarket = 11,
  StopLimit = 12,
}

export enum OrderTimeInForce {
  GoodTillCancelled = 1,
  ImmediateOrCancel = 2,
  FillOrKill = 3,
  Day = 4,
  GoodTillDate = 5, // NEEDS expireTime
}
