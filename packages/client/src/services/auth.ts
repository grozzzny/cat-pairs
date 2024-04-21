import { AuthApi } from '@/api';
import { VALID_AUTH_ERROR } from '@/helpers/constants/api';
import { isRequestError } from '@/helpers/request';
import {
  GetUserRequestDto,
  LoginRequestDto,
  LoginRequestResult,
} from '@/helpers/types';

const successAuthData = { isOk: true, reason: '' };

export class AuthService {
  static async login(
    props: LoginRequestDto
  ): Promise<LoginRequestResult | undefined> {
    try {
      const response = await AuthApi.login(props);
      if (response?.ok && !isRequestError(response.status)) {
        return successAuthData;
      }
      // eslint-disable-next-line no-unsafe-optional-chaining
      const { reason } = await response?.json();
      if (reason === VALID_AUTH_ERROR) {
        return successAuthData;
      }
      return { isOk: false, reason };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }

  static async getServiceId() {
    try {
      const response = await AuthApi.getServiceId();
      if (!response.ok) {
        throw new Error('Error to get serviceId');
      }
      const { service_id } = await response.json();
      return service_id;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }

  static async loginOauth({
    code,
  }: {
    code: string;
  }): Promise<LoginRequestResult | undefined> {
    try {
      const responseAuth = await AuthApi.loginOauth({ code });
      if (responseAuth.ok && !isRequestError(responseAuth.status)) {
        return { isOk: true, reason: '' };
      }
      const { reason } = await responseAuth.json();
      return { isOk: false, reason: reason };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }

  static async getUser(props: GetUserRequestDto): Promise<boolean> {
    const response = await AuthApi.getUser(props);
    return response?.ok ?? false;
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
