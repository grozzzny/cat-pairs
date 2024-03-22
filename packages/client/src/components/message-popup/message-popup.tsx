import './message-popup.css';
import { CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { toggleOpenPopup } from '@/store/userSlice';

interface MessagePopupProps {
  message: string;
  backPath: string;
}

export const MessagePopup = ({ message, backPath }: MessagePopupProps) => {
  const isPopupOpen = useAppSelector(state => state.user.isPopupOpen);
  const dispatch = useAppDispatch();
  const popupClass = `popup  ${isPopupOpen ? 'popup_opened' : ''}`;
  const navigate = useNavigate();
  const onClose = () => {
    dispatch(toggleOpenPopup(false));
    navigate(backPath);
  };
  return (
    <div className={popupClass}>
      <div className='popup__form-container'>
        <button
          className='popup__close-button'
          type='button'
          aria-label='закрыть'
          onClick={() => onClose()}>
          <CloseOutlined
            rev={undefined}
            style={{ fontSize: '150%', color: '#565A5D' }}
          />
        </button>
        <div className='popup__message'>{message}</div>
      </div>
    </div>
  );
};
