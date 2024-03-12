import { Input as AntInput } from 'antd';
import './input.css';

interface InputProps {
  label: string;
  required?: boolean;
  error?: string;
  type?: InputType;
}

type InputType = 'password' | 'text';

export const Input = ({
  label,
  required = false,
  error,
  type = 'text',
}: InputProps) => {
  const inputProps = {
    placeholder: label,
    required,
    error,
    className: 'input',
  };

  if (type === 'text') {
    return <AntInput {...inputProps} />;
  }

  if (type === 'password') {
    return <AntInput.Password {...inputProps} />;
  }

  // Можно добавлять другие типы инпутов, если потребуется

  return <AntInput {...inputProps} />;
};
