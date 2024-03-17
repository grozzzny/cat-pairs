import { YANDEX_API_HOST } from '@/helpers/constants/api';
import { DataChangePassword } from '@/helpers/types/user';

export class UserApi {
  static async changePassword(passwordData: DataChangePassword) {
    return await fetch(`${YANDEX_API_HOST}/user/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(passwordData),
    });
  }

  /*static async changeAvatar(data: FormData) {
    return await fetch(`${YANDEX_API_HOST}/user/password`, {
      ...API_PARAMS,
      method: 'PUT',
      body: data,
    });
  }*/
}
