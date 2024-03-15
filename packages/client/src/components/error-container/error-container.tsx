import { Button, Flex } from 'antd';
import './error-container.css';

interface ErrorContainerProps {
  code: string;
  description: string;
}

export const ErrorContainer = ({
  code,
  description,
}: ErrorContainerProps): JSX.Element => {
  return (
    <Flex className='error-container' vertical align='center'>
      <h1 className='error-container__title'>{code}</h1>
      <div className='error-container__subtitle'>Error</div>
      <div className='error-container__description'>{description}</div>
      <Button
        type='primary'
        size='large'
        className='error-container__button'
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
