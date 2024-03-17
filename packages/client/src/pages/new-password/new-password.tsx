import {
  AuthWrapper,
  Button,
  Input,
  MessagePopup,
  PageWrapper,
} from '@/components';
import { Form, type FormProps } from 'antd';
import { UserService } from '@/servises/user';
import { UserApi } from '@/api/user';
import { DataChangePassword } from '@/helpers/types';
import { useEffect, useState } from 'react';
import './new-password.css';

type RegistrationFieldType = {
  oldpasswod: string;
  newpassword: string;
  newpassword2: string;
};

const onFinishFailed: FormProps<RegistrationFieldType>['onFinishFailed'] =
  errorInfo => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo);
  };

export const NewPassword = () => {
  //этот useEffect для авторизации, его не будет, нужен для проверки работы смены пароля
  useEffect(() => {
    //авторизация
    /* const bodyData = JSON.stringify({
      login: 'test19',
      password: 'qqqQQQ111',
    });
    fetch('https://ya-praktikum.tech/api/v2/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: bodyData,
    })
      .then(res => res.json())
      .then(data => console.log('Успешно:', data))
      .catch(err => console.error('Ошибка:', err));

    //выход
    /* fetch('https://ya-praktikum.tech/api/v2/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => console.log('Успешно:', data))
      .catch(err => console.error('Ошибка:', err));*/
  }, []);

  const [message, setMessage] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleChangePassword = async ({
    oldPassword,
    newPassword,
  }: DataChangePassword) => {
    const result = await UserService.changePassword({
      oldPassword,
      newPassword,
    });
    if (result.isOk) {
      setIsPopupOpen(true);
      setMessage('Пароль успешно изменен');
    } else {
      setIsPopupOpen(true);
      setMessage('Не удалось поменять пароль');
    }
  };

  const onFinish: FormProps<RegistrationFieldType>['onFinish'] = values => {
    handleChangePassword({
      oldPassword: values.oldpasswod,
      newPassword: values.newpassword,
    });
  };
  const darkTheme = false;
  return (
    <PageWrapper withMenu={false}>
      <AuthWrapper darkTheme={darkTheme} label=''>
        <>
          <Form
            name='basic'
            layout='horizontal'
            initialValues={{}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
            className='new-password__form'>
            <Form.Item<RegistrationFieldType> name='oldpasswod'>
              <Input placeholder='Старый пароль' type='password' />
            </Form.Item>
            <Form.Item<RegistrationFieldType> name='newpassword'>
              <Input placeholder='Новый пароль' type='password' />
            </Form.Item>
            <Form.Item<RegistrationFieldType> name='newpassword2'>
              <Input
                placeholder='Введите новый пароль еще раз'
                type='password'
              />
            </Form.Item>
            <Button
              darkTheme={darkTheme}
              label='Поменять пароль'
              htmlType='submit'
              size='large'
            />
          </Form>
          <MessagePopup
            isPopupOpen={isPopupOpen}
            handleClosePopup={handleClosePopup}
            message={message}
            backPath='../profile'
          />
        </>
      </AuthWrapper>
    </PageWrapper>
  );
};
