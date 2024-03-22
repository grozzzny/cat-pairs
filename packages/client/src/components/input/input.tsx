import { Input as AntInput, InputProps as AntInputProps } from 'antd';
import './input.css';
import React from 'react';
import { TextAreaProps } from 'antd/es/input/TextArea';

interface InputProps extends AntInputProps {
  type?: InputType;
}

type InputType = 'password' | 'text' | 'textarea';

export const Input: React.FC<InputProps> = props => {
  const { type, ...restProps } = props;

  if (type === 'text') {
    return <AntInput className='input' {...restProps} />;
  }

  if (type === 'password') {
    return <AntInput.Password className='input' {...restProps} />;
  }

  if (type === 'textarea') {
    return (
      <AntInput.TextArea
        className='textarea'
        {...(restProps as TextAreaProps)}
      />
    );
  }

  return <AntInput className='input' {...restProps} />;
};
