import './profile-popup.css';
import { CloseOutlined } from '@ant-design/icons';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { UserService } from '@/services/user';

interface ProfilePopupProps {
  isPopupOpen: boolean;
  handleClosePopup: () => void;
  handleSetAvatar: (val: string) => void;
}

export const ProfilePopup = ({
  isPopupOpen,
  handleClosePopup,
  handleSetAvatar,
}: ProfilePopupProps) => {
  const popupClass = `popup  ${isPopupOpen ? 'popup_opened' : ''}`;

  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);
      const result = await UserService.changeAvatar(formData);

      if (result && result.isOk && result.avatar) {
        handleSetAvatar(result.avatar);
      }
      handleClosePopup();
      setFile(null);
    }
  };

  const heandleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const onClose = () => {
    handleClosePopup();
    setFile(null);
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
        <form className='popup__form'>
          <label htmlFor='fileInput' className='popup__form-input'>
            <input
              id='fileInput'
              className=''
              type='file'
              onChange={e => heandleOnChange(e)}
            />
            <span className='popup__form-button-choose'>Выберите файл</span>
          </label>
          <button
            className='popup__form-button'
            type='submit'
            onClick={e => handleSubmit(e)}>
            Поменять аватар
          </button>
        </form>
      </div>
    </div>
  );
};
