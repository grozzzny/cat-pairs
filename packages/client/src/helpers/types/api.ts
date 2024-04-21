import { typeWithSignal } from '.';

export type LoginRequestDto = {
  login: string;
  password: string;
};

export type LoginOauthDto = {
  code: string;
  redirect_url: string;
};

export type LoginOauthRequestDto = Pick<LoginOauthDto, 'code'>;

export type LoginRequestResult = {
  isOk: boolean;
  reason: string;
};

export type GetUserRequestDto = typeWithSignal<unknown>;
