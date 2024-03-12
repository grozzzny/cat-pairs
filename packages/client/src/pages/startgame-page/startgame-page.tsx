import { PageWrapper } from '@/components';
import './startgame-page.css';
import { Loader } from '@/components';
import { Timer } from '@/components';

export const StartGamePage = () => {
  return (
    <PageWrapper>
      <div className='start__container'>
        <Timer />
        <Loader />
      </div>
    </PageWrapper>
  );
};
