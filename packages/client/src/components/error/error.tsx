import { Button, Flex } from 'antd';
import './error.css';

interface ErrorProps {
  code: string;
  description: string;
}

export const Error = ({ code, description }: ErrorProps): JSX.Element => {
  return (
    <Flex className='http-error' vertical align='center'>
      <h1 className='http-error__title'>{code}</h1>
      <div className='http-error__subtitle'>Error</div>
      <div className='http-error__description'>{description}</div>
      <Button
        type='primary'
        size='large'
        className='http-error__button'
        onClick={() => {
          // Здесь используем History API вместо useNavigate, так как ErrorProvider,
          // который возвращает страницу 500-й ошибки, подключается раньше, чем Router, и при
          // использовании useNavigate страница 500-й ошибки падает с ошибкой
          // "useNavigate() may be used only in the context of a <Router> component"
          history.back();
        }}>
        Вернуться
      </Button>
    </Flex>
  );
};
