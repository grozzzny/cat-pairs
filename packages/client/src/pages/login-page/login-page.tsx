import {
  AuthWrapper,
  Button,
  IconButton,
  Input,
  PageWrapper,
} from '@/components';
import { AuthService } from '@/services';
import { Flex, Form, FormProps, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import './login-page.css';
import {
  setPageTitle,
  validateLogin,
  validatePassword,
  validateRequired,
} from '@/helpers';
import { useAuth } from '@/helpers/hooks/useAuth';
import { redirectToUrl } from '@/helpers/redirect-helper';
import { OAUTH_REDIRECT_URI } from '@/helpers/constants/api';

type LoginFieldType = {
  login: string;
  password: string;
};

const navigateOauth = (serviceId: string, redirectUri: string) => {
  window.open(
    `https://oauth.yandex.ru/authorize?response_type=code&client_id=${serviceId}&redirect_uri=${redirectUri}`,
    '_self'
  );
};

export const LoginPage = () => {
  setPageTitle('Войти');
  const navigate = useNavigate();
  const [notify, contextHolder] = notification.useNotification();
  const { setAuth } = useAuth();

  const onOauth = async () => {
    notify.warning({
      message: 'Загрузка',
      description: 'Авторизация начнется через мгновение :)',
      className: 'notification-bar',
    });
    const serviceId = await AuthService.getServiceId();
    if (!serviceId) {
      notify.error({
        message: 'Ошибка авторизации',
        description:
          'Невозможно подключиться к сервису Yandex, попробуйте чуть позже',
        className: 'notification-bar',
      });
      return;
    }
    navigateOauth(serviceId, OAUTH_REDIRECT_URI);
  };

  const onFinish: FormProps<LoginFieldType>['onFinish'] = async ({
    login,
    password,
  }) => {
    const result = await AuthService.login({ login, password });
    if (result?.isOk) {
      setAuth?.();
      navigate('/');
      redirectToUrl('/');
      return;
    }
    const errorMessage = `Не удалось войти: ${result?.reason}`;
    notify.error({
      message: 'Ошибка авторизации',
      description: errorMessage,
      className: 'notification-bar',
    });
  };

  return (
    <PageWrapper withMenu={false}>
      <div className='container-vertical-center'>
        <AuthWrapper darkTheme={false} label='Вход'>
          <Form
            name='basic'
            layout='horizontal'
            initialValues={{}}
            onFinish={onFinish}
            autoComplete='off'
            className='login-form'>
            <Flex vertical gap={32}>
              <Flex vertical className='login-form__top' align='center' gap={8}>
                <Form.Item<LoginFieldType>
                  name='login'
                  rules={[
                    { validator: validateLogin },
                    { validator: validateRequired },
                  ]}>
                  <Input placeholder='Логин' />
                </Form.Item>
                <Form.Item<LoginFieldType>
                  name='password'
                  rules={[
                    { validator: validatePassword },
                    { validator: validateRequired },
                  ]}>
                  <Input placeholder='Пароль' type='password' />
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
                <Flex align='center' gap={8}>
                  <span>Войти с помощью: </span>
                  <IconButton
                    type='default'
                    icon={<img src='public/yandex-icon.svg' />}
                    onClick={onOauth}
                  />
                </Flex>
              </Flex>
            </Flex>
          </Form>
        </AuthWrapper>
      </div>
    </PageWrapper>
  );
};
