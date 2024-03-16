import { UserApi } from '@/api';
import { DataChangePassword, PasswordRequestResult } from '@/helpers/types';

export class UserService {
  static async changePassword(
    props: DataChangePassword
  ): Promise<PasswordRequestResult> {
    const response = await UserApi.changePassword(props);
    if (response.ok && response.status <= 400) {
      return { isOk: true, reason: '' };
    }
    const error = await response.json();
    return { isOk: false, reason: error.reason };
  }
}
