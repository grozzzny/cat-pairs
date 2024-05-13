import { BackgroundWrapper, Button, LinkList } from '@/components';
import './main-page.css';
import { setPageTitle } from '@/helpers';
import { Col, Divider, Flex, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/helpers/hooks/storeHooks';
import { setTheme } from '@/store/userSlice';
import { Theme } from '@/helpers/constants/global';
import { withAuthRouteHOC } from '@/helpers/hooks/withAuthRouteHOC';
import { ThemeService } from '@/services/theme';
import { useNotification } from '@/providers/notification-provider';

const MainPage = () => {
  const theme = useAppSelector(state => state.user.theme);
  const { notify } = useNotification();
  const navigate = useNavigate();
  setPageTitle('CatCoders');
  const dispatch = useAppDispatch();
  const handlerTheme = (theme: Theme) => {
    new ThemeService()
      .updateUserTheme(theme)
      .then(() => dispatch(setTheme(theme)))
      .catch(err => notify('error', err.message));
  };

  return (
    <div
      className={[
        'main-page',
        theme === Theme.Dark ? 'main-page--dark' : null,
      ].join(' ')}>
      <BackgroundWrapper title={'CatCoders'}>
        <Row gutter={24} justify='space-between'>
          <Col sm={24} md={12}>
            <Flex vertical justify='left' gap={21}>
              <Button
                className='main-page__button-theme'
                darkTheme={true}
                label='Темная тема'
                onClick={() => handlerTheme(Theme.Dark)}
              />
              <Button
                className='main-page__button-theme'
                label='Светлая тема'
                onClick={() => handlerTheme(Theme.Light)}
              />
            </Flex>
          </Col>
          <Col sm={24} md={12}>
            <Flex vertical justify='right'>
              <Button
                block
                darkTheme={theme !== Theme.Dark}
                label='Играть'
                onClick={() => navigate('/game')}
              />
            </Flex>
          </Col>
        </Row>
      </BackgroundWrapper>
      <div className='main-page__container'>
        <Divider orientation='left' plain>
          <div className='text--dark-color'>Описание игры</div>
        </Divider>
        <p>
          Игра 'CatCoders' - захватывающее приключение, где игроку предстоит
          найти все пары карт на игровом поле. В каждом ходе игрок открывает две
          карточки, и если они совпадают, они остаются открытыми. Если нет, они
          снова закрываются, а игрок продолжает поиск пары. Эта игра требует
          хорошей памяти и внимательности, и в то же время она предлагает
          моменты размышления и стратегические решения для максимального успеха.
        </p>
        <p>
          Постепенно открывая карточки, игрок развивает свои навыки концентрации
          и улучшает память. Благодаря разнообразию уровней сложности и тематик,
          игра 'CatCoders' остается захватывающим и вызывающим испытанием для
          игрока, где каждая новая игра приносит свежие впечатления и
          удовлетворение от достижения новых результатов.
        </p>
        <Divider orientation='left' plain>
          <div className='text--dark-color'>Дополнительно:</div>
        </Divider>
        <LinkList />
        <Divider plain />
        <Flex align='center' vertical>
          <p>
            &copy; {new Date().getFullYear()} CatCoders. Все права защищены.
          </p>
          <p>
            Для технической поддержки, пожалуйста, свяжитесь с нами по
            электронной почте:{' '}
            <a className='link' href='mailto:support@catCoders.ru'>
              support@catCoders.ru
            </a>
          </p>
        </Flex>
        <br />
        <br />
      </div>
    </div>
  );
};

export default withAuthRouteHOC(MainPage);
