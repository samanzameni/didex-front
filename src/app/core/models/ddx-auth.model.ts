export interface AuthFormData {
  email: string;
  password: string;
}

export interface AuthResetPasswordFormData {
  email: string;
}

export interface AuthFormResponse {
  token: string;
  twoFactorEnabled: boolean;
  roles: string[];
}
