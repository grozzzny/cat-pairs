import { ButtonProps } from 'antd';
import { Button } from '@/components';
import './icon-button.css';

interface IconButtonProps extends ButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
}

export const IconButton = (props: IconButtonProps) => {
  const { icon, onClick, ...rest } = props;

  return (
    <Button
      className='icon-button'
      type='text'
      size='large'
      label=''
      icon={icon}
      onClick={onClick}
      {...rest}
    />
  );
};
