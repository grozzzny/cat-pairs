import { BackgroundWrapper, Button, LinkList } from '@/components';
import './main-page.css';
import { setBodyScroll, setPageTitle } from '@/helpers';
import { Col, Divider, Flex, Row } from 'antd';
import React, { useEffect } from 'react';
import { Theme } from '@/helpers/constants/global';
import { useNavigate } from 'react-router-dom';
import Paragraph from 'antd/es/typography/Paragraph';

import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  fetchGetCurrentUser,
  setThemeDark,
  setThemeLight,
} from '@/store/userSlice';
import { notification } from 'antd';

export const MainPage = () => {
  const navigate = useNavigate();
  setPageTitle('CatCoders');
  // На уровне layouts установлен запрет на скроллинг страницы, поэтому этот метод отменяет эти действия. MainPage - это лендинг страница.
  setBodyScroll();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchGetCurrentUser());
  }, []);
  const theme = useAppSelector(state => state.user.theme);
  useEffect(() => {
    console.log(theme);
  }, [theme]);

  const error: undefined | string = useAppSelector(state => state.user.error);
  const [notify, contextHolder] = notification.useNotification();
  useEffect(() => {
    if (error) {
      const errorMessage = `Не удалось установить пользователя: ${error}`;
      notify.error({
        message: 'Ошибка авторизации',
        description: errorMessage,
        className: 'notification-bar',
      });
    }
  }, [error]);

  /*const handleChangeTheme = (theme: Theme) => {
    // eslint-disable-next-line no-console
    console.log('setTheme', theme);
  };*/
  return (
    <div className='main-page'>
      <BackgroundWrapper title={'CatCoders'}>
        <Row gutter={24} justify='space-between'>
          <Col sm={24} md={12}>
            <Flex vertical justify='left' gap={21}>
              <Button
                className='main-page__button-theme'
                darkTheme={true}
                label='Темная тема'
                onClick={() => dispatch(setThemeDark())}
              />
              <Button
                className='main-page__button-theme'
                label='Светлая тема'
                onClick={() => dispatch(setThemeLight())}
              />
            </Flex>
          </Col>
          <Col sm={24} md={12}>
            <Flex vertical justify='right'>
              <Button
                className='main-page__button-play'
                darkTheme={true}
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
        <Paragraph>
          Игра 'CatCoders' - захватывающее приключение, где игроку предстоит
          найти все пары карт на игровом поле. В каждом ходе игрок открывает две
          карточки, и если они совпадают, они остаются открытыми. Если нет, они
          снова закрываются, а игрок продолжает поиск пары. Эта игра требует
          хорошей памяти и внимательности, и в то же время она предлагает
          моменты размышления и стратегические решения для максимального успеха.
        </Paragraph>
        <Paragraph>
          Постепенно открывая карточки, игрок развивает свои навыки концентрации
          и улучшает память. Благодаря разнообразию уровней сложности и тематик,
          игра 'CatCoders' остается захватывающим и вызывающим испытанием для
          игрока, где каждая новая игра приносит свежие впечатления и
          удовлетворение от достижения новых результатов.
        </Paragraph>
        <Divider orientation='left' plain>
          <div className='text--dark-color'>Дополнительно:</div>
        </Divider>
        <LinkList />
        <Divider plain />
        <Flex align='center' vertical>
          <Paragraph>
            &copy; {new Date().getFullYear()} CatCoders. Все права защищены.
          </Paragraph>
          <Paragraph>
            Для технической поддержки, пожалуйста, свяжитесь с нами по
            электронной почте:{' '}
            <a className='link' href='mailto:support@catCoders.ru'>
              support@catCoders.ru
            </a>
          </Paragraph>
        </Flex>
        <br />
        <br />
        {contextHolder}
      </div>
    </div>
  );
};
