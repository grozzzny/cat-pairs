import { ThemeConfig } from 'antd/es/config-provider/context';

export const enum Color {
  Dark = '#565A5D',
  Light = '#EFE5CC',
}

export const enum Theme {
  Dark = 'dark',
  Light = 'light',
}

export const THEME_ANTD: ThemeConfig = {
  token: {
    colorPrimary: Color.Light,
    colorText: Color.Light,
    colorIcon: Color.Dark,
  },
  components: {
    Typography: {
      colorText: Color.Dark,
    },
  },
};
