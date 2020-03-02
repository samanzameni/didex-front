export interface OrderData {
  marketSymbol: string;
  side: OrderSide;
  type: OrderType;
  timeInForce: OrderTimeInForce; // limit (dropdown)
  quantity: number; // amount
  price?: number; // limit (limit input)
  stopPrice?: number; // NO NEED
  postOnly: boolean; // limit (check)
  expireTime?: string; // if TmieInFor === 5 then show (NO NEED FOR NOW)
}

export enum OrderSide {
  Buy = 0,
  Sell = 1,
}

export enum OrderStatus {
  New = 0,
  PartiallyFilled = 1,
  Filled = 2,
  Canceled = 3,
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
