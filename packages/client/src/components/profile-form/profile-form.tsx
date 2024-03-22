import './profile-form.css';
import { Button } from '@/components/button';
import { Form, type FormProps } from 'antd';
import {
  validateEmail,
  validateFirstName,
  validateLogin,
  validatePassword,
  validatePhone,
  validateRequired,
  validateSecondName,
} from '@/helpers';
import { Input } from '@/components';
import { useAppDispatch, useAppSelector } from '../../hooks';

type ProfileFieldType = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  password: string;
};

const currentUser: ProfileFieldType = {
  first_name: 'Федор',
  second_name: 'Иванов',
  login: 'fred',
  email: 'fred@email.ru',
  phone: '+79635897856',
  password: 'Qq123zz',
};

export const ProfileForm = () => {
  const currentUser = useAppSelector(state => state.user.currentUser);
  const onFinish: FormProps<ProfileFieldType>['onFinish'] = data => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <Form
      name='basic'
      layout='horizontal'
      initialValues={currentUser}
      onFinish={onFinish}
      autoComplete='off'
      className='profile-form'>
      <div className='profile-form__input-container'>
        <Form.Item<ProfileFieldType>
          name='first_name'
          label='Имя'
          className='profile-form__label'
          rules={[
            { validator: validateFirstName },
            { validator: validateRequired },
          ]}>
          <Input className='profile-form__input' />
        </Form.Item>
      </div>
      <div className='profile-form__input-container'>
        <Form.Item<ProfileFieldType>
          name='second_name'
          label='Фамилия'
          className='profile-form__label'
          rules={[
            { validator: validateSecondName },
            { validator: validateRequired },
          ]}>
          <Input className='profile-form__input' />
        </Form.Item>
      </div>
      <div className='profile-form__input-container'>
        <Form.Item<ProfileFieldType>
          name='email'
          label='Емаил'
          className='profile-form__label'
          rules={[
            { validator: validateEmail },
            { validator: validateRequired },
          ]}>
          <Input className='profile-form__input' />
        </Form.Item>
      </div>
      <div className='profile-form__input-container'>
        <Form.Item<ProfileFieldType>
          name='phone'
          label='Телефон'
          className='profile-form__label'
          rules={[
            { validator: validatePhone },
            { validator: validateRequired },
          ]}>
          <Input className='profile-form__input' />
        </Form.Item>
      </div>
      <div className='profile-form__input-container'>
        <Form.Item<ProfileFieldType>
          name='login'
          label='Логин'
          className='profile-form__label'
          rules={[
            { validator: validateLogin },
            { validator: validateRequired },
          ]}>
          <Input className='profile-form__input' />
        </Form.Item>
      </div>
      <div className='profile-form__input-container'>
        <Form.Item<ProfileFieldType>
          name='password'
          label='Пароль'
          className='profile-form__label'
          rules={[
            { validator: validatePassword },
            { validator: validateRequired },
          ]}>
          <Input
            className='profile-form__input profile-form__input-password'
            type='password'
          />
        </Form.Item>
      </div>
      <Button htmlType='submit' label={'Редактировать'} />
    </Form>
  );
};
