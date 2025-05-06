import React from 'react';
import { Rule } from 'rc-field-form/lib/interface';
import { InputNumber as AntdInputNumber } from 'antd';

import { StyledFormInputNumber } from './style';

export interface InputNumberProps {
  name?: string;
  onChange?: (value: string | number | null) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  size?: 'large' | 'middle' | 'small';
  value?: string;
  defaultValue?: string;
  label?: string;
  rules?: Rule[];
  className?: string;
  min?: number | string;
  max?: number | string;
}

export const InputNumber = ({
  name,
  onChange,
  onBlur,
  className,
  placeholder,
  required,
  value,
  defaultValue,
  rules,
  size = 'large',
  type,
  label,
  min,
  max,
}: InputNumberProps) => {
  return (
    <StyledFormInputNumber label={label} name={name} rules={rules}>
      <AntdInputNumber
        className={className}
        size={size}
        type={type}
        min={min}
        max={max}
        placeholder={placeholder}
        required={required}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        onBlur={onBlur}
      />
    </StyledFormInputNumber>
  );
};
