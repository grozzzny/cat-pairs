import { Button } from 'antd';
import './error.css';

interface ErrorProps {
  code: string;
  description: string;
}

export const Error = ({ code, description }: ErrorProps): JSX.Element => {
  return (
    <div className='error'>
      <h1 className='error__title'>{code}</h1>
      <div className='error__subtitle'>Error</div>
      <div className='error__description'>{description}</div>
      <Button
        type='primary'
        size='large'
        className='error__button'
        onClick={() => {
          // Здесь используем History API вместо useNavigate, так как ErrorProvider,
          // который возвращает страницу 500-й ошибки, подключается раньше, чем Router, и при
          // использовании useNavigate страница 500-й ошибки падает с ошибкой
          // "useNavigate() may be used only in the context of a <Router> component"
          history.back();
        }}>
        Вернуться
      </Button>
    </div>
  );
};
