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
