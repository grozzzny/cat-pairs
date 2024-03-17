import { useEffect, useState } from 'react';
import './profile-avatar.css';
interface ProfileAvatarProps {
  handleOpenPopup: () => void;
  handleClosePopup: () => void;
}
export const ProfileAvatar = ({ handleOpenPopup }: ProfileAvatarProps) => {
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
  //  const isOpen = useSelector(state=>state.isPopupOpen)
  useEffect(() => {
    //этого запроса тоже не будет, аватар будет подтягиваться из редакса, в папку апи не стала выносить
    /* fetch('https://ya-praktikum.tech/api/v2/auth/user', {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ok') {
          setImage(`https://ya-praktikum.tech/api/v2/${data.avatar}`);
          
        }
      })
      .catch(err => console.error('Ошибка:', err));*/
  }, []);

  return (
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
  );
};
