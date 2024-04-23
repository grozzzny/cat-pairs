import { fetchHelper, getString, setHeaders } from '@/helpers';
import { OAUTH_REDIRECT_URI } from '@/helpers/constants/api';
import {
  GetUserRequestDto,
  LoginOauthRequestDto,
  LoginRequestDto,
} from '@/helpers/types/api';

export class AuthApi {
  static login(params: LoginRequestDto) {
    return fetchHelper('/auth/signin', {
      method: 'POST',
      body: getString(params),
      headers: setHeaders('application/json'),
    });
  }

  static fetchServiceId() {
    return fetchHelper(
      `/oauth/yandex/service-id?redirect_uri=${OAUTH_REDIRECT_URI}`,
      {
        method: 'GET',
        headers: setHeaders('application/json'),
      }
    );
  }

  static loginOauth({ code }: LoginOauthRequestDto) {
    return fetchHelper('/oauth/yandex', {
      method: 'POST',
      body: getString({ code, redirect_uri: OAUTH_REDIRECT_URI }),
      headers: setHeaders('application/json'),
    });
  }

  static fetchUser({ signal }: GetUserRequestDto) {
    return fetchHelper('/auth/user', {
      method: 'GET',
      signal,
      headers: setHeaders('application/json'),
    });
  }

  static logout() {
    return fetchHelper('/auth/logout', {
      method: 'POST',
    });
  }
}
