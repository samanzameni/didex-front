export interface Trader {
  personalInformation: TraderPersonalInformation;
  mobileNumber: TraderMobileNumber;
  kycImages: TraderKycImage[];
  generalInformation?: TraderGeneralInformation;
  status: TraderStatus;
}

export interface TraderKycImage {
  image: string;
  imageType: number;
}

export interface TraderMobileNumber {
  mobileNumber: string;
  countryTelephoneCode: string;
  code: string;
}

export interface TraderPersonalInformation {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  birthCountryCode: string;
  addressLine1: string;
  addressLine2: string;
  countryCode: string;
  zipCode: string;
  city: string;
}

export interface TraderGeneralInformation {
  nickName?: string;
  timeZone?: string;
}

export enum TraderStatus {
  Newbie = 0,
  KycSent = 1,
  Approved = 2,
  Banned = 3,
}
