import './message-popup.css';
import { CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface MessagePopupProps {
  isPopupOpen: boolean;
  handleClosePopup: () => void;
  message: string;
  backPath: string;
}

export const MessagePopup = ({
  isPopupOpen,
  handleClosePopup,
  message,
  backPath,
}: MessagePopupProps) => {
  const popupClass = `popup  ${isPopupOpen ? 'popup_opened' : ''}`;

  const navigate = useNavigate();
  const onClose = () => {
    handleClosePopup();
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
