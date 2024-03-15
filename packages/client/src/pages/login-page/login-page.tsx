import { Input, PageWrapper } from '@/components';
import { Flex } from 'antd';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const navigate = useNavigate();
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
            <Input placeholder='Логин' />
            <Input placeholder='Пароль' type='password' />
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
          </Flex>
        </Flex>
      </Flex>
    </PageWrapper>
  );
};
