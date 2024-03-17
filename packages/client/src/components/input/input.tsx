import { Input as AntInput, InputProps as AntInputProps } from 'antd';
import './input.css';

interface InputProps extends AntInputProps {
  type?: InputType;
}

type InputType = 'password' | 'text';

export const Input = (props: InputProps) => {
  const { type, ...restProps } = props;
  const inputProps = { ...restProps, className: 'input' };

  if (type === 'text') {
    return <AntInput {...inputProps} />;
  }

  if (type === 'password') {
    return <AntInput.Password {...inputProps} />;
  }

  // Можно добавлять другие типы инпутов, если потребуется

  return <AntInput {...inputProps} />;
};
