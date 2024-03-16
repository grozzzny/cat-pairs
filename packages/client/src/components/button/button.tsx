import React from 'react';
import {
  Button as ButtonAntd,
  ButtonProps as ButtonPropsAntd,
  ConfigProvider,
} from 'antd';
import { Color } from '@/helpers';
import { ComponentToken } from 'antd/es/button/style/token';
import { SeedToken } from 'antd/es/theme/interface/seeds';

interface ButtonProps extends ButtonPropsAntd {
  label: string;
  darkTheme?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  darkTheme = false,
  ...rest
}) => {
  const commonConfig: Partial<ComponentToken | SeedToken> = {
    lineWidth: 0,
    defaultShadow: '',
    borderRadius: 8,
    controlHeight: 51,
  };

  let buttonConfig: Partial<ComponentToken>;

  if (darkTheme) {
    buttonConfig = {
      ...commonConfig,
      ...{
        defaultHoverBg: Color.Dark,
        defaultActiveBg: Color.Dark,
        defaultBg: Color.Dark,
        colorText: Color.Light,
        defaultHoverColor: Color.Light,
      },
    };
  } else {
    buttonConfig = {
      ...commonConfig,
      ...{
        defaultBg: Color.Light,
        colorText: Color.Dark,
        defaultHoverColor: Color.Dark,
      },
    };
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: buttonConfig,
        },
      }}>
      <ButtonAntd {...rest}>{label}</ButtonAntd>
    </ConfigProvider>
  );
};
