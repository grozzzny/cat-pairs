import { BaseApi } from '@/api/base';
import { FetchHelperParams, fetchServerHelper } from '@/helpers/fetch-helper';
import { User } from '@/helpers/types';

export class ServerUserApi extends BaseApi {
  getFetch(url: string, options: FetchHelperParams) {
    return fetchServerHelper(url, options);
  }

  create() {
    return this.get<User>('/user/create');
  }

  update() {
    return this.get<User>('/user/update');
  }
}
