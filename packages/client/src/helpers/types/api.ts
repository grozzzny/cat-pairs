export type LoginRequestDto = {
  login: string;
  password: string;
};

export type LoginRequestResult = {
  isOk: boolean;
  reason: string;
};
