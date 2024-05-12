import { BaseApi } from '@/api/base';
import {
  FetchHelperParams,
  fetchServerHelper,
  setHeadersWithCookie,
} from '@/helpers/fetch-helper';
import { User, UserServer } from '@/helpers/types';

export class ServerUserApi extends BaseApi {
  getFetch(url: string, options: FetchHelperParams) {
    return fetchServerHelper(url, options);
  }

  createUser() {
    return this.get<User>('/user/create');
  }

  updateUser() {
    return this.get<User>('/user/update');
  }

  getUserWithCookie(ctx: string) {
    return this.fetch<UserServer>('/user/getUser', {
      method: 'GET',
      headers: setHeadersWithCookie('application/json', ctx),
    });
  }
}
