import { BaseApi } from '@/api/base';
import { FetchHelperParams, fetchServerHelper } from '@/helpers/fetch-helper';
import { Theme } from '@/helpers/constants/global';

export class ThemeApi extends BaseApi {
  getFetch(url: string, options: FetchHelperParams) {
    return fetchServerHelper(url, options);
  }

  createTheme(theme: Theme) {
    return this.post('/theme/create', {
      theme,
    });
  }

  getAll() {
    return this.get('/theme/getAll');
  }

  getUserTheme() {
    return this.get('/theme');
  }

  updateUserTheme(theme: Theme) {
    return this.put('/theme', {
      theme,
    });
  }
}
