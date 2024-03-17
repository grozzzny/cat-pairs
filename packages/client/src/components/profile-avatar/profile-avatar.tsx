import { useEffect, useState } from 'react';
import './profile-avatar.css';
import { ProfilePopup } from '@/components/profile-popup';
import { YANDEX_API_HOST } from '@/helpers/constants/api';

export const ProfileAvatar = () => {
  //этот useEffect для авторизации, его не будет, нужен для проверки работы смены аватара
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

  const [image, setImage] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSetAvatar = (val: string) => {
    setImage(`${YANDEX_API_HOST}/resources${val}`);
  };

  return (
    <>
      <ProfilePopup
        isPopupOpen={isPopupOpen}
        handleClosePopup={handleClosePopup}
        handleSetAvatar={handleSetAvatar}
      />
      <div className='profile-avatar' onClick={handleOpenPopup}>
        {image ? (
          <img
            className='profile-avatar__img'
            src={image}
            alt='фото пользователя'
          />
        ) : (
          <p className='profile-avatar__text'>фото</p>
        )}
      </div>
    </>
  );
};
