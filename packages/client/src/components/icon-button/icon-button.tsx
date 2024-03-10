import { Button } from 'antd';
import './icon-button.css';

interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
}

export const IconButton = (props: IconButtonProps) => {
  const { icon, onClick } = props;
  return (
    <Button
      className='icon-button'
      type='text'
      size='large'
      icon={icon}
      onClick={onClick}
    />
  );
};
