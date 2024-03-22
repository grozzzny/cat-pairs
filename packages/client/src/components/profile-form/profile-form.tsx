import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import './profile-form.css';
import { profileFormErrors } from '@/helpers/constants/profile-form-errors';
import { Button } from '@/components/button';
import { useEffect } from 'react';

interface ProfileForm {
  firstName: string;
  lastName: string;
  nikName: string;
  email: string;
  phone: string;
  password: string;
}

interface User {
  firstName: string;
  lastName: string;
  nikName: string;
  email: string;
  phone: string;
  password: string;
}

/*const currentUser: User = {
  firstName: 'Федор',
  lastName: 'Иванов',
  nikName: 'Fred',
  email: 'fred@email.ru',
  phone: '+79635897856',
  password: 'Qq123zz',
};*/

export const ProfileForm = () => {
  const currentUser = useAppSelector(state => state.user.currentUser);
  console.log(currentUser);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ProfileForm>({
    defaultValues: { ...currentUser },
    mode: 'onChange',
  });

  const submit: SubmitHandler<ProfileForm> = data => {
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className='profile-form'>
      <div className='profile-form__input-container'>
        <label className='profile-form__label'>
          Имя
          <input
            className='profile-form__input'
            {...register('firstName', {
              required: profileFormErrors.required,
              maxLength: {
                value: 50,
                message: profileFormErrors.length,
              },
              minLength: {
                value: 2,
                message: profileFormErrors.length,
              },
            })}
          />
        </label>
        <div className='profile-form__error-container'>
          {errors.firstName && (
            <span className='profile-form__error'>
              {errors.firstName.message}
            </span>
          )}
        </div>
      </div>
      <div className='profile-form__input-container'>
        <label className='profile-form__label'>
          Фамилия
          <input
            className='profile-form__input'
            {...register('lastName', {
              required: profileFormErrors.required,
              maxLength: {
                value: 50,
                message: profileFormErrors.length,
              },
              minLength: {
                value: 2,
                message: profileFormErrors.length,
              },
            })}
          />
        </label>
        <div className='profile-form__error-container'>
          {errors.lastName && (
            <span className='profile-form__error'>
              {errors.lastName.message}
            </span>
          )}
        </div>
      </div>
      <div className='profile-form__input-container'>
        <label className='profile-form__label'>
          Hикнейм
          <input
            className='profile-form__input'
            {...register('nikName', {
              required: profileFormErrors.required,
              maxLength: {
                value: 50,
                message: profileFormErrors.length,
              },
              minLength: {
                value: 2,
                message: profileFormErrors.length,
              },
            })}
          />
        </label>
        <div className='profile-form__error-container'>
          {errors.nikName && (
            <span className='profile-form__error'>
              {errors.nikName.message}
            </span>
          )}
        </div>
      </div>
      <div className='profile-form__input-container'>
        <label className='profile-form__label'>
          Email
          <input
            className='profile-form__input'
            {...register('email', {
              required: profileFormErrors.required,
              pattern: {
                message: profileFormErrors.errorEmail,
                value: profileFormErrors.regEmail,
              },
            })}
          />
        </label>
        <div className='profile-form__error-container'>
          {errors.email && (
            <span className='profile-form__error'>{errors.email.message}</span>
          )}
        </div>
      </div>
      <div className='profile-form__input-container'>
        <label className='profile-form__label'>
          Tелефон
          <input
            className='profile-form__input'
            {...register('phone', {
              required: profileFormErrors.required,
              pattern: {
                message: profileFormErrors.errorPhone,
                value: profileFormErrors.regPhone,
              },
            })}
          />
        </label>
        <div className='profile-form__error-container'>
          {errors.phone && (
            <span className='profile-form__error'>{errors.phone.message}</span>
          )}
        </div>
      </div>
      <div className='profile-form__input-container'>
        <label className='profile-form__label'>
          Пароль
          <input
            className='profile-form__input'
            {...register('password', {
              required: profileFormErrors.required,
              pattern: {
                message: profileFormErrors.errorPassword,
                value: profileFormErrors.regPassword,
              },
            })}
          />
        </label>
        <div className='profile-form__error-container'>
          {errors.password && (
            <span className='profile-form__error'>
              {errors.password.message}
            </span>
          )}
        </div>
      </div>
      <Button label={'Редактировать'} />
    </form>
  );
};
