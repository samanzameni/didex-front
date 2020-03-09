export interface Balance {
  currency: string;
  available: number;
  reserved: number;
}

export interface BalanceWithdrawData {
  address: string;
  amount: number;
  autoCommit: boolean;
  currency: string;
  includeFee: boolean;
}

export interface BalanceTransferData {
  currency: string;
  amount: number;
  type: BalanceTransferType;
}

export enum BalanceTransferType {
  BankToExchange = 3,
  ExchangeToBank = 4,
}
