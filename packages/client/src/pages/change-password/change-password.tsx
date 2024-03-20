import {
  AuthWrapper,
  Button,
  Input,
  MessagePopup,
  PageWrapper,
} from '@/components';
import { Form, type FormProps } from 'antd';
import { UserService } from '@/services/user';
import { DataChangePassword } from '@/helpers/types';
import { useState } from 'react';
import './change-password.css';

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
  const [message, setMessage] = useState<string>('');
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

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
    if (result && result.isOk) {
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
