import { fetchHelper, getString, setHeaders } from '@/helpers';
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

  static logout() {
    return fetchHelper('/auth/logout', {
      method: 'POST',
    });
  }
}
