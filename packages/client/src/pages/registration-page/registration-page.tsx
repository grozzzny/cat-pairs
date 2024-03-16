import { AuthWrapper, Button, Input, PageWrapper } from '@/components';
import { Form, type FormProps } from 'antd';
import React from 'react';
import './registration-page.css';
import { setPageTitle } from '@/helpers/helper';

type RegistrationFieldType = {
  first_name?: string;
  second_name?: string;
  email?: string;
  phone?: string;
  login?: string;
  password?: string;
};

const onFinish: FormProps<RegistrationFieldType>['onFinish'] = () => {
  // code...
};

const onFinishFailed: FormProps<RegistrationFieldType>['onFinishFailed'] =
  () => {
    // code...
  };

export const RegistrationPage = () => {
  setPageTitle('Регистрация');

  const darkTheme = false;

  return (
    <PageWrapper>
      <AuthWrapper darkTheme={darkTheme} label='Регистрация'>
        <Form
          name='basic'
          layout='horizontal'
          initialValues={{}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
          className='registration-page__form'>
          <Form.Item<RegistrationFieldType> name='first_name'>
            <Input placeholder='Имя' />
          </Form.Item>
          <Form.Item<RegistrationFieldType> name='second_name'>
            <Input placeholder='Фамилия' />
          </Form.Item>
          <Form.Item<RegistrationFieldType> name='email'>
            <Input placeholder='Email' />
          </Form.Item>
          <Form.Item<RegistrationFieldType> name='phone'>
            <Input placeholder='Телефон' />
          </Form.Item>
          <Form.Item<RegistrationFieldType> name='login'>
            <Input placeholder='Логин' />
          </Form.Item>
          <Form.Item<RegistrationFieldType> name='password'>
            <Input placeholder='Пароль' type='password' />
          </Form.Item>
          <Button
            darkTheme={darkTheme}
            label='Зарегистрироваться'
            htmlType='submit'
          />
        </Form>
      </AuthWrapper>
    </PageWrapper>
  );
};
