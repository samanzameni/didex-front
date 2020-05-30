export interface AuthFormData {
  email: string;
  password: string;
}

export interface AuthEmailActivationData {
  email: string;
  token: string;
}

export interface AuthResetPasswordData {
  email: string;
  token: string;
  newPassword: string;
}

export interface AuthResetPasswordFormData {
  email: string;
}

export interface AuthFormResponse {
  token: string;
  twoFactorEnabled: boolean;
  roles: string[];
}

export interface TwoFactorQRData {
  qrUri: string;
  manualKey: string;
}

export interface TwoFactorData {
  code: string;
}

export interface TwoFactorResponse {
  recoveryKey: string;
}
