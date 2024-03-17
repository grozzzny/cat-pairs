import './profile-popup.css';
import { CloseOutlined, ConsoleSqlOutlined } from '@ant-design/icons';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { UserService } from '@/servises/user';

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
      .catch(err => console.error('Ошибка:', err));*/
    //выход
    /*fetch('https://ya-praktikum.tech/api/v2/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => console.log('Успешно:', data))
      .catch(err => console.error('Ошибка:', err));*/
  }, []);

  const popupClass = `popup  ${isPopupOpen ? 'popup_opened' : ''}`;

  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);
      const result = await UserService.changeAvatar(formData);

      if (result.isOk && result.avatar) {
        handleSetAvatar(result.avatar);
      }
      handleClosePopup();
      /*fetch('https://ya-praktikum.tech/api/v2/user/profile/avatar', {
        method: 'PUT',
        body: formData,
        credentials: 'include',
      })
        .then(res => res.json())
        .then(data => {
          console.log('Запрос выполнен: ');
          if (data.status === 'ok') console.log('успешно: ', data);
          else console.log('с ошибкой: ', data);
        })
        .catch(err => console.error('Ошибка:', err));*/
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
