import { Input, MessagePopup, PageWrapper } from '@/components';
import { Button, Form, type FormProps } from 'antd';
import { UserService } from '@/servises/user';
import { DataChangePassword } from '@/helpers/types';
import { useState } from 'react';

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
  const [message, setMessage] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  {
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
      {
        handleChangePassword({
          oldPassword: values.oldpasswod,
          newPassword: values.newpassword,
        });
      }
    };

    return (
      <PageWrapper withMenu={false}>
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
              <Input placeholder='Еще раз' type='password' />
            </Form.Item>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form>
          <MessagePopup
            isPopupOpen={isPopupOpen}
            handleClosePopup={handleClosePopup}
            message={message}
            backPath='../profile'
          />
        </>
      </PageWrapper>
    );
  }
};
