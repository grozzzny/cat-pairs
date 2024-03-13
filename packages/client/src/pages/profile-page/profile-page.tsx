import {
  PageWrapper,
  ProfileAvatar,
  ProfileForm,
  ProfilePopup,
} from '@/components';
import './profile-page.css';
import { useState } from 'react';

export const ProfilePage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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
        <div className='profile__container'>
          <ProfileAvatar
            handleOpenPopup={handleOpenPopup}
            handleClosePopup={handleClosePopup}
          />
          <ProfileForm />
        </div>
      </PageWrapper>
    </>
  );
};
