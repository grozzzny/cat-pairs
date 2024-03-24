import { PageWrapper } from '@/components';
import './startgame-page.css';
import { Loader, StartTimer } from '@/components';
import { withAuthRouteHOC } from '@/helpers/hooks/withAuthRouteHOC';

const StartGamePage = () => {
  return (
    <PageWrapper>
      <div className='start-page'>
        <StartTimer />
        <Loader />
      </div>
    </PageWrapper>
  );
};

export default withAuthRouteHOC(StartGamePage);
