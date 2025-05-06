import React from 'react';
import { Form, Checkbox as AntdCheckbox } from 'antd';
import { Rule } from 'rc-field-form/lib/interface';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

export interface CheckboxProps {
  onChange?: ((e: CheckboxChangeEvent) => void) | undefined;
  onBlur?: ((event: React.FocusEvent<HTMLInputElement>) => void) | undefined;
  label?: string;
  name?: (string | number)[] | string | number;
  className?: string;
  rules?: Rule[];
  noStyle?: boolean;
  initialValue?: boolean;
  disabled?: boolean;
  checked?: boolean | undefined;
  valuePropName?: string;
  value?: any;
  required?: boolean;
}

export const Checkbox = ({
  disabled = false,
  label,
  name,
  onChange,
  onBlur,
  rules,
  className,
  noStyle,
  initialValue,
  checked,
  valuePropName,
  value,
  required,
}: CheckboxProps) => {
  return (
    <Form.Item
      valuePropName={valuePropName}
      name={name}
      rules={rules}
      className={className}
      noStyle={noStyle}
      initialValue={initialValue}
      required={required}
    >
      <AntdCheckbox value={value} disabled={disabled} onChange={onChange} checked={checked}>
        {label}
      </AntdCheckbox>
    </Form.Item>
  );
};
