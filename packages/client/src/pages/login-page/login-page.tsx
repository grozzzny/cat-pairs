import { Input, PageWrapper } from '@/components';
import { AuthService } from '@/services/auth';
import { Flex } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export const LoginPage = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginChange = (e: InputEvent) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e: InputEvent) => {
    setPassword(e.target.value);
  };

  return (
    <PageWrapper withMenu={false}>
      <Flex justify='center' align='center' className='form'>
        <Flex
          vertical
          className='form__wrapper'
          justify='space-between'
          gap={128}>
          <Flex vertical className='form__wrapper-top' align='center' gap={8}>
            <div className='form__title'>Вход</div>
            <Input
              placeholder='Логин'
              value={login}
              onChange={handleLoginChange}
            />
            <Input
              placeholder='Пароль'
              type='password'
              value={password}
              onChange={handlePasswordChange}
            />
          </Flex>
          <Flex vertical className='form__wrapper-bottom' align='center'>
            <div className='text'>
              Не зарегистрированы?&nbsp;
              <span
                className='text link'
                onClick={() => navigate('/registration')}>
                Регистрация
              </span>
            </div>
            <button onClick={() => AuthService.login({ login, password })}>
              Войти
            </button>
          </Flex>
        </Flex>
      </Flex>
    </PageWrapper>
  );
};
