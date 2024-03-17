import { fetchHelper } from '@/helpers';
import { LoginRequestDto } from '@/helpers/types/api';

export class AuthApi {
  static login(params: LoginRequestDto) {
    return fetchHelper({
      url: '/auth/signin',
      method: 'POST',
      data: params,
    });
  }

  static getUser() {
    return fetchHelper({
      url: '/auth/user',
      method: 'GET',
    });
  }
}
