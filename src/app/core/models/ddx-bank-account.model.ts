export namespace BankAccount {
  export interface Model {
    id: number;
    iban: string;
    currencyShortName: string;
    cardNumber: string;
    confirmed: boolean;
  }

  export interface AddFormData {
    iban: string;
    currencyShortName: string;
    cardNumber: string;
  }

  export interface DepositInitiateFormData {
    id: number;
    amount: number;
  }

  export interface DepositInitiateResponse {
    redirectLink: string;
  }

  export interface DepositVerifyData {
    token: string;
  }

  export interface WithdrawFormData {
    currency: string;
    amount: number;
    bankAccountId: number;
    autoCommit: boolean;
    includeFee: boolean;
    code?: string;
  }
}
