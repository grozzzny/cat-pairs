import { useState } from 'react';
import './profile-avatar.css';
import { ProfilePopup } from '@/components/profile-popup';
import { YANDEX_API_HOST } from '@/helpers/constants/api';
import { useAppDispatch } from '@/hooks';
import { toggleOpenAvatarPopup } from '@/store/userSlice';

export const ProfileAvatar = () => {
  const [image, setImage] = useState('');
  const dispatch = useAppDispatch();

  const handleOpenPopup = () => {
    dispatch(toggleOpenAvatarPopup(true));
  };

  const handleSetAvatar = (val: string) => {
    setImage(`${YANDEX_API_HOST}/resources${val}`);
  };

  return (
    <>
      <ProfilePopup handleSetAvatar={handleSetAvatar} />
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
