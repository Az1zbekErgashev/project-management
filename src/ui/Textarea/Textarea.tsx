import React from 'react';
import { Form } from 'antd';
import { Rule } from 'rc-field-form/lib/interface';
import { StyledTextarea } from './style';
import { useTranslation } from 'react-i18next';

export interface TextAreaProps {
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  size?: 'large' | 'middle' | 'small';
  value?: string;
  defaultValue?: string;
  maxLength?: number;
  allowClear?: boolean;
  label?: string | React.ReactNode;
  rules?: Rule[];
  name?: (string | number)[] | string | number;
  className?: string;
  validateTrigger?: string | string[];
  noStyle?: boolean;
  initialValue?: string;
  disabled?: boolean;
  rows?: number;
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement> | undefined;
}

export const TextArea = ({
  disabled = false,
  placeholder,
  name,
  required,
  onChange,
  size = 'large',
  value,
  onBlur,
  defaultValue,
  maxLength = 255,
  allowClear,
  label,
  rules = [],
  className,
  validateTrigger,
  noStyle,
  initialValue,
  rows = 4,
  onKeyDown,
}: TextAreaProps) => {
  const { t } = useTranslation();

  const validateInput = (rule: Rule, value: string, callback: (error?: string) => void) => {
    if (/^\s+$/.test(value)) {
      callback(t('pleaseEnteraValidValue'));
    } else {
      callback();
    }
  };
  return (
    <Form.Item
      initialValue={initialValue}
      label={label}
      name={name}
      rules={[
        ...rules,
        {
          validator: validateInput,
        },
      ]}
      className={className}
      validateTrigger={validateTrigger}
      noStyle={noStyle}
    >
      <StyledTextarea
        disabled={disabled}
        placeholder={placeholder}
        required={required}
        size={size}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        defaultValue={defaultValue}
        maxLength={maxLength}
        allowClear={allowClear}
        rows={rows}
        onKeyDown={onKeyDown}
      />
    </Form.Item>
  );
};
