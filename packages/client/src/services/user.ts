import { UserApi } from '@/api';
import {
  AvatarRequestResult,
  DataChangePassword,
  PasswordRequestResult,
} from '@/helpers/types';

export class UserService {
  static async changePassword(
    props: DataChangePassword
  ): Promise<PasswordRequestResult | undefined> {
    try {
      const response = await UserApi.changePassword(props);
      if (response.ok && response.status <= 400) {
        return { isOk: true, reason: '' };
      }
      const error = await response.json();
      return { isOk: false, reason: error.reason };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }

  static async changeAvatar(
    props: FormData
  ): Promise<AvatarRequestResult | undefined> {
    try {
      const response = await UserApi.changeAvatar(props);
      if (response.status <= 400) {
        const user = await response.json();
        return { isOk: true, avatar: user.avatar };
      } else {
        const error = await response.json();
        return { isOk: false, error: error.reason };
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }
}
