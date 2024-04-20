import {
  fetchHelper,
  getString,
  setHeaders,
  setHeadersWithCookei,
} from '@/helpers';
import { fetchHelperServer } from '@/helpers/fetch-helper';
import { GetUserRequestDto, LoginRequestDto } from '@/helpers/types/api';

export class AuthApi {
  static login(params: LoginRequestDto) {
    return fetchHelper('/auth/signin', {
      method: 'POST',
      body: getString(params),
      headers: setHeaders('application/json'),
    });
  }

  static getUser({ signal }: GetUserRequestDto) {
    return fetchHelper('/auth/user', {
      method: 'GET',
      signal,
      headers: setHeaders('application/json'),
    });
  }

  static getUserProxy({ signal }: GetUserRequestDto) {
    return fetchHelper('/auth/user', {
      method: 'GET',
      signal,
      headers: setHeaders('application/json'),
    });
  }

  static getUserWhithCookie({ signal }: GetUserRequestDto, ctx: string) {
    return fetchHelperServer('/auth/user', {
      method: 'GET',
      signal,
      headers: setHeadersWithCookei('application/json', ctx),
    });
  }

  static logout() {
    return fetchHelper('/auth/logout', {
      method: 'POST',
    });
  }
}
