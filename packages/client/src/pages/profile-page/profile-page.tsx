import { PageWrapper, ProfileAvatar, ProfileForm } from '@/components';
import './profile-page.css';
import { useNavigate } from 'react-router-dom';

export const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <div className='profile-page'>
        <ProfileAvatar />
        <ProfileForm />
        <p
          className='profile-page__change-password'
          onClick={() => navigate('../change-password')}>
          Сменить пароль
        </p>
      </div>
    </PageWrapper>
  );
};
