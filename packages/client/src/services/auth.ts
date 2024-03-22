import { AuthApi } from '@/api';
import { isRequestError } from '@/helpers/request';
import { LoginRequestDto, LoginRequestResult } from '@/helpers/types';

export class AuthService {
  static async login(
    props: LoginRequestDto
  ): Promise<LoginRequestResult | undefined> {
    try {
      const response = await AuthApi.login(props);
      if (response.ok && !isRequestError(response.status)) {
        return { isOk: true, reason: '' };
      }
      const error = await response.json();
      return { isOk: false, reason: error.reason };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }

  static async getUser(): Promise<boolean> {
    const response = await AuthApi.getUser();
    return response.ok;
  }

  static async logout(): Promise<LoginRequestResult | undefined> {
    try {
      const response = await AuthApi.logout();
      if (response.ok && !isRequestError(response.status)) {
        return { isOk: true, reason: '' };
      }
      const error = await response.json();
      return { isOk: false, reason: error.reason };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }
}
