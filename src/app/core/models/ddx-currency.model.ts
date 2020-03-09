export interface Currency {
  shortName: string;
  name: string;
  crypto: boolean;
  enabled: boolean;
  payinEnabled: boolean;
  payinConfirmations: number;
  payoutEnabled: boolean;
  transferEnabled: boolean;
  payoutFee: number;
}
