import { Input as AntInput, InputProps as AntInputProps } from 'antd';
import './input.css';

interface InputProps extends AntInputProps {
  type?: InputType;
}

type TextAreaProps = HTMLTextAreaElement;

type InputType = 'password' | 'text' | 'textarea';

export const Input = (props: InputProps | TextAreaProps) => {
  const { type, ...restProps } = props;
  let inputProps = {};

  /* eslint-disable indent */
  switch (type) {
    case 'password':
    case 'text':
      inputProps = { ...(restProps as InputProps), className: 'input' };
      break;
    case 'textarea':
      inputProps = { ...(restProps as TextAreaProps), className: 'textarea' };
      break;
    default:
      inputProps = { ...(restProps as InputProps), className: 'input' };
      break;
  }

  if (type === 'text') {
    return <AntInput {...inputProps} />;
  }

  if (type === 'password') {
    return <AntInput.Password {...inputProps} />;
  }

  if (type === 'textarea') {
    const { TextArea } = AntInput;
    return <TextArea {...inputProps} />;
  }

  // Можно добавлять другие типы инпутов, если потребуется

  return <AntInput {...inputProps} />;
};
