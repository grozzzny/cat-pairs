import { ThemeApi } from '@/api/theme';
import { Theme } from '@/helpers/constants/global';

export class ThemeService {
  constructor(public readonly api: ThemeApi = new ThemeApi()) {}

  createTheme(theme: Theme) {
    return this.api.createTheme(theme);
  }

  getAll() {
    return this.api.getAll();
  }

  getUserTheme() {
    return this.api.getUserTheme();
  }

  updateUserTheme(theme: Theme) {
    return this.api.updateUserTheme(theme);
  }
}
