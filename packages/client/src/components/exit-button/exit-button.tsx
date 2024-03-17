import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './exit-button.css';
import { Color } from '@/helpers/constants/global';

export const ExitButtom = () => {
  const navigate = useNavigate();
  return (
    <div
      className='exit-button'
      onClick={() => {
        navigate('/');
      }}>
      <button className='exit-button__button'>
        <p className='exit-button__button-text'>выход из игры</p>
        <LogoutOutlined
          style={{ fontSize: '150%', color: Color.Dark }}
          rev={undefined}
        />
      </button>
    </div>
  );
};
