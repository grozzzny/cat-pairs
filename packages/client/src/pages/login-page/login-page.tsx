import { Input, PageWrapper } from '@/components';
import { Flex } from 'antd';
import './login-page.css';

export const LoginPage = () => {
  return (
    <PageWrapper>
      <Flex justify='center' align='center' className='form'>
        <Flex
          vertical
          className='form__wrapper'
          justify='space-between'
          gap={128}>
          <Flex vertical className='form__wrapper-top' align='center' gap={8}>
            <div className='form__title'>Вход</div>
            <Input label='Логин' />
            <Input label='Пароль' type='password' />
          </Flex>
          <Flex vertical className='form__wrapper-bottom' align='center'>
            <div className='text'>
              Не зарегистрированы?&nbsp;
              <span className='text link'>Регистрация</span>
            </div>
          </Flex>
        </Flex>
      </Flex>
    </PageWrapper>
  );
};
