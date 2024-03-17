import {
  PageWrapper,
  ProfileAvatar,
  ProfileForm,
  ProfilePopup,
} from '@/components';
import './profile-page.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProfilePage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <ProfilePopup
        isPopupOpen={isPopupOpen}
        handleClosePopup={handleClosePopup}
      />

      <PageWrapper>
        <div className='profile-page'>
          <ProfileAvatar
            handleOpenPopup={handleOpenPopup}
            handleClosePopup={handleClosePopup}
          />
          <ProfileForm />
          <p
            className='profile-page__change-password'
            onClick={() => navigate('../new-password')}>
            Сменить пароль
          </p>
        </div>
      </PageWrapper>
    </>
  );
};
