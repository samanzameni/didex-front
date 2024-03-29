export interface Transaction {
  id: number;
  transactionId: string;
  currencyShortName: string;
  amount: number;
  fee: number;
  address: string;
  hash: string;
  status: number;
  type: TransactionType;
  createdAt: string;
  updatedAt: string;
  errorCode: string;
}

export enum TransactionStatus {
  Created = 1,
  Pending = 2,
  Failed = 3,
  Success = 4,
}

export enum TransactionType {
  CryptoDeposit = 1,
  CryptoWithdraw = 2,
  BankToExchange = 3,
  ExchangeToBank = 4,
  BankToInvest = 5,
  InvestToBank = 6,
  Interest = 7,
  Reward = 8,
  FiatDeposit = 9,
  FiatWithdraw = 10,
}
