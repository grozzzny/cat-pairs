import { PageWrapper } from '@/components';
import './startgame-page.css';
import { Loader } from '@/components';
import { Timer } from '@/components';

export const StartGamePage = () => {
  return (
    <PageWrapper>
      <div className='start-page'>
        <Timer />
        <Loader />
      </div>
    </PageWrapper>
  );
};
