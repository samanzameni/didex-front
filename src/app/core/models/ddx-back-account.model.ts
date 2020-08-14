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
}
