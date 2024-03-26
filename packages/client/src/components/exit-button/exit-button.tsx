import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './exit-button.css';
import { Color } from '@/helpers/constants/global';
import { AuthService } from '@/services/auth';
import { MessagePopup } from '../message-popup';
import { deleteCurrentUser, setUserAuth } from '@/store/userSlice';
import { useAppDispatch } from '@/hooks';
import { useState } from 'react';

export const ExitButton = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleExit = async () => {
    const result = await AuthService.logout();
    if (result?.isOk) {
      dispatch(deleteCurrentUser());
      dispatch(setUserAuth(false));
      navigate('/login');
      return;
    } else {
      handleOpenPopup();
    }
  };
  return (
    <>
      <MessagePopup
        message='Не удалось выйти из игры'
        backPath='/'
        isPopupOpen={isPopupOpen}
        handleClosePopup={handleClosePopup}
      />
      <div className='exit-button' onClick={handleExit}>
        <button className='exit-button__button'>
          <p className='exit-button__button-text'>выход из игры</p>
          <LogoutOutlined
            style={{ fontSize: '150%', color: Color.Dark }}
            rev={undefined}
          />
        </button>
      </div>
    </>
  );
};
