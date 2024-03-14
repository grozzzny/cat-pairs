import './profile-popup.css';
import { CloseOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';

interface ProfilePopupProps {
  isPopupOpen: boolean;
  handleClosePopup: () => void;
}
interface ChengeAvatarForm {
  file: string;
}

export const ProfilePopup = ({
  isPopupOpen,
  handleClosePopup,
}: ProfilePopupProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<ChengeAvatarForm>();

  const popupClass = `popup  ${isPopupOpen ? 'popup_opened' : ''}`;

  const onSubmit = () => {
    const avatar = getValues('file');
    console.log(avatar);
    handleClosePopup();
    reset();
    //const formData = new FormData();
    //formData.append('avatar', avatar);
    //установить в state и отправить на сервер
  };

  const onClose = () => {
    handleClosePopup();
    reset();
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
        <form className='popup__form' onSubmit={handleSubmit(onSubmit)}>
          <label className='popup__form-input'>
            <input
              className='popup__form__input'
              type='file'
              {...register('file', {
                required: 'Вы не выбрали файл',
                pattern: /^[A-Za-z]{1,8}\.[A-Za-z]{1,3}$/,
              })}
            />
            <span className='popup__form-button-choose'>Выберите файл</span>
            <div className='popup__form-error-container'>
              {errors.file && (
                <span className='popup__form-error'>{errors.file.message}</span>
              )}
            </div>
          </label>
          <button className='popup__form-button' type='submit'>
            Поменять аватар
          </button>
        </form>
      </div>
    </div>
  );
};
