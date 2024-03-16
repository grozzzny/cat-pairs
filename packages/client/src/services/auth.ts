import { AuthApi } from '@/api';
import { isRequestError } from '@/helpers/request';
import { LoginRequestDto, LoginRequestResult } from '@/helpers/types';

export class AuthService {
  static async login(props: LoginRequestDto): Promise<LoginRequestResult> {
    const response = await AuthApi.login(props);
    if (response.ok && !isRequestError(response.status)) {
      return { isOk: true, reason: '' };
    }
    const error = await response.json();
    return { isOk: false, reason: error.reason };
  }

  static async getUser(): Promise<boolean> {
    const response = await AuthApi.getUser();
    return response.ok;
  }
}
