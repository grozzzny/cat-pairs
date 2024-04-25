import { AuthWrapper, Button, Input, PageWrapper } from '@/components';
import { Form, type FormProps } from 'antd';
import React from 'react';
import './registration-page.css';
import { setPageTitle } from '@/helpers/helper';
import {
  validateEmail,
  validateFirstName,
  validateLogin,
  validatePassword,
  validatePhone,
  validateRequired,
  validateSecondName,
} from '@/helpers';
import { useNavigate } from 'react-router-dom';

type RegistrationFieldType = {
  first_name?: string;
  second_name?: string;
  email?: string;
  phone?: string;
  login?: string;
  password?: string;
};

export const RegistrationPage = () => {
  const navigate = useNavigate();
  setPageTitle('Регистрация');

  const darkTheme = false;

  const onFinish: FormProps<RegistrationFieldType>['onFinish'] = () => {
    // code...
  };

  const onFinishFailed: FormProps<RegistrationFieldType>['onFinishFailed'] =
    () => {
      // code...
    };
  return (
    <PageWrapper withMenu={false}>
      <div className='container-vertical-center'>
        <AuthWrapper darkTheme={darkTheme} label='Регистрация'>
          <Form
            name='basic'
            layout='horizontal'
            initialValues={{}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
            className='registration-page__form'>
            <Form.Item<RegistrationFieldType>
              name='first_name'
              rules={[
                { validator: validateFirstName },
                { validator: validateRequired },
              ]}>
              <Input placeholder='Имя' />
            </Form.Item>
            <Form.Item<RegistrationFieldType>
              name='second_name'
              rules={[
                { validator: validateSecondName },
                { validator: validateRequired },
              ]}>
              <Input placeholder='Фамилия' />
            </Form.Item>
            <Form.Item<RegistrationFieldType>
              name='email'
              rules={[
                { validator: validateEmail },
                { validator: validateRequired },
              ]}>
              <Input placeholder='Email' />
            </Form.Item>
            <Form.Item<RegistrationFieldType>
              name='phone'
              rules={[
                { validator: validatePhone },
                { validator: validateRequired },
              ]}>
              <Input placeholder='Телефон' />
            </Form.Item>
            <Form.Item<RegistrationFieldType>
              name='login'
              rules={[
                { validator: validateLogin },
                { validator: validateRequired },
              ]}>
              <Input placeholder='Логин' />
            </Form.Item>
            <Form.Item<RegistrationFieldType>
              name='password'
              rules={[
                { validator: validatePassword },
                { validator: validateRequired },
              ]}>
              <Input placeholder='Пароль' type='password' />
            </Form.Item>
            <Button
              darkTheme={darkTheme}
              label='Зарегистрироваться'
              htmlType='submit'
            />
            <div className='registration-page__footer'>
              <span>Есть учетные данные? </span>
              <a onClick={() => navigate('/login')}>Войти</a>
            </div>
          </Form>
        </AuthWrapper>
      </div>
    </PageWrapper>
  );
};
