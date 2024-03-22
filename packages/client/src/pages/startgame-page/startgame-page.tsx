import { PageWrapper } from '@/components';
import './startgame-page.css';
import { Loader, StartTimer } from '@/components';

export const StartGamePage = () => {
  return (
    <PageWrapper>
      <div className='start-page'>
        <StartTimer />
        <Loader />
      </div>
    </PageWrapper>
  );
};
