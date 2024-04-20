import { PageWrapper } from '@/components';
import { ErrorContainer } from '@/components';

export const Page404 = () => {
  const withMenu = false;
  const errorCode = '404';
  const errorDescription = 'страница не найдена';
  return (
    <PageWrapper withMenu={withMenu}>
      <ErrorContainer code={errorCode} description={errorDescription} />
    </PageWrapper>
  );
};
