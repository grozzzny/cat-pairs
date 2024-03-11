import { LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './exit.css';

export const Exit = () => {
  return (
    <div className='exit__container'>
      <Link className='exit__link' to='/'>
        <p className='exit__text'>выход из игры</p>
        <LogoutOutlined
          style={{ fontSize: '150%', color: '#565A5D' }}
          rev={undefined}
        />
      </Link>
    </div>
  );
};
