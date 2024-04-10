import { fetchHelper, getString, setHeaders } from '@/helpers';
import { DataChangePassword, ProfileFieldType } from '@/helpers/types/user';

export class UserApi {
  static async changePassword(params: DataChangePassword) {
    return await fetchHelper('/user/password', {
      method: 'PUT',
      body: getString(params),
      headers: setHeaders('application/json'),
    });
  }

  static async changeAvatar(data: FormData) {
    return fetchHelper('/user/profile/avatar', {
      method: 'PUT',
      body: data,
    });
  }

  static async changeUser(params: ProfileFieldType) {
    return fetchHelper('/user/profile', {
      method: 'PUT',
      body: getString(params),
      headers: setHeaders('application/json'),
    });
  }
}
