import { useEffect, useState } from 'react';
import './profile-avatar.css';
interface ProfileAvatarProps {
  handleOpenPopup: () => void;
  handleClosePopup: () => void;
}
export const ProfileAvatar = ({ handleOpenPopup }: ProfileAvatarProps) => {
  const [image, setImage] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false); //  const isOpen = useSelector(state=>state.isPopupOpen)
  useEffect(() => {
    //запрос на сервер '@/../../public/avatar.png'
    setImage('@/../../public/avatar.png');
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
