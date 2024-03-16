import { Input, PageWrapper } from '@/components';
import { Button } from '@/components/button';
import { AuthService } from '@/services/auth';
import { Flex } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export const LoginPage = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('NikDoomchan');
  const [password, setPassword] = useState('QWERTY123');

  const handleLoginChange = (e: InputEvent) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e: InputEvent) => {
    setPassword(e.target.value);
  };

  const handleValidateLogin = async () => {
    const result = await AuthService.login({ login, password });
    if (result.isOk) {
      navigate('/');
      return;
    }
    console.log(`Не удалось войти: ${result.reason}`);
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
          <Flex
            vertical
            className='form__wrapper-bottom'
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
            <Button block label='Войти' onClick={handleValidateLogin} />
          </Flex>
        </Flex>
      </Flex>
    </PageWrapper>
  );
};
