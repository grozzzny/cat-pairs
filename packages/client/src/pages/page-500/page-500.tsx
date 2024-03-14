import { ConfigProvider } from 'antd';
import { PageWrapper } from '@/components';
import { Error } from '@/components';
import { ThemeProps } from '@/providers/error-provider';

type Page500Props = {
  error?: string;
  theme: ThemeProps;
};

export const Page500 = ({ error = 'ошибка сервера', theme }: Page500Props) => {
  const withMenu = false;
  const errorCode = '500';

  return (
    <ConfigProvider theme={theme}>
      <PageWrapper withMenu={withMenu}>
        <Error code={errorCode} description={error} />
      </PageWrapper>
    </ConfigProvider>
  );
};
