import { AuthWrapper, Button, Input, PageWrapper } from '@/components';
import { AuthService } from '@/services';
import { Flex, Form, notification } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login-page.css';
import { useAppDispatch } from '@/hooks';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [notify, contextHolder] = notification.useNotification();

  const handleLoginChange = (e: InputEvent) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e: InputEvent) => {
    setPassword(e.target.value);
  };

  const handleValidateLogin = async () => {
    const result = await AuthService.login({ login, password });
    if (result?.isOk) {
      navigate('/');
      return;
    }
    // eslint-disable-next-line no-console
    const errorMessage = `Не удалось войти: ${result?.reason}`;
    notify.error({
      message: 'Ошибка авторизации',
      description: errorMessage,
      className: 'notification-bar',
    });
  };

  const handleFailedValidation = () => {
    // TODO: добавить валидацию ошибок
  };

  return (
    <PageWrapper withMenu={false}>
      <AuthWrapper darkTheme={false} label='Вход'>
        <Form
          name='basic'
          layout='horizontal'
          initialValues={{}}
          onFinish={handleValidateLogin}
          onFinishFailed={handleFailedValidation}
          autoComplete='off'
          className='login-form'>
          <Flex vertical gap={32}>
            <Flex vertical className='login-form__top' align='center' gap={8}>
              <Form.Item>
                <Input
                  placeholder='Логин'
                  value={login}
                  onChange={handleLoginChange}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  placeholder='Пароль'
                  type='password'
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Form.Item>
            </Flex>
            <Flex
              vertical
              className='login-form__bottom'
              align='center'
              gap={8}>
              <div className='text'>
                Не зарегистрированы?&nbsp;
                <span
                  className='text link'
                  onClick={() => navigate('/registration')}>
                  Регистрация
                </span>
              </div>
              {contextHolder}
              <Button block label='Войти' htmlType='submit' />
            </Flex>
          </Flex>
        </Form>
      </AuthWrapper>
    </PageWrapper>
  );
};
