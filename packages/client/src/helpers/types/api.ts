import { typeWithSignal } from '.';

export type LoginRequestDto = {
  login: string;
  password: string;
};

export type LoginRequestResult = {
  isOk: boolean;
  reason: string;
};

export type GetUserRequestDto = typeWithSignal<unknown>;
