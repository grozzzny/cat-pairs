import { API_PARAMS, YANDEX_API_HOST } from '@/helpers/constants/api';
import { LoginRequestDto } from '@/helpers/types/auth';

export class AuthApi {
  static async login(params: LoginRequestDto) {
    return await fetch(`${YANDEX_API_HOST}/auth/signin`, {
      ...API_PARAMS,
      method: 'POST',
      body: JSON.stringify(params),
    });
  }
}
