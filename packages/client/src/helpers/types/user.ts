export interface DataChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface PasswordRequestResult {
  isOk: boolean;
  reason: string;
}
