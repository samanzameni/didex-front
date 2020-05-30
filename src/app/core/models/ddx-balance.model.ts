export interface Balance {
  currency: string;
  available: number;
  reserved: number;
}

export interface BalanceWithdrawData {
  currency: string;
  amount: number;
  address: string;
  autoCommit: boolean;
  includeFee: boolean;
  code?: string;
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
