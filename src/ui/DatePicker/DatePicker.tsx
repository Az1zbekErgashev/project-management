import React from 'react';
import { Form } from 'antd';
import { Rule } from 'rc-field-form/lib/interface';
import dayjs from 'dayjs';
import { StyledDatePicker } from './style';

export interface DatePickerProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  type?: string;
  size?: 'large' | 'middle' | 'small';
  defaultValue?: string;
  maxLength?: number;
  allowClear?: boolean;
  label?: string;
  rules?: Rule[];
  name?: (string | number)[] | string | number;
  className?: string;
  validateTrigger?: string | string[];
  noStyle?: boolean;
  initialValue?: string;
  disabled?: boolean;
  format?: string;
  disabledDate?: (current: dayjs.Dayjs) => any;
  value?: any;
  picker?: any;
  customDisabledDate?: (current: dayjs.Dayjs) => boolean;
}

export const DatePicker = ({
  disabled = false,
  placeholder,
  name,
  size = 'large',
  onBlur,
  maxLength = 255,
  allowClear,
  label,
  rules,
  className,
  validateTrigger,
  noStyle,
  initialValue,
  format,
  disabledDate,
  customDisabledDate,
  value,
  picker,
}: DatePickerProps) => {
  const defaultDisabledDate = (current: dayjs.Dayjs) => {
    // Disable dates before 1990
    return current.year() < 1900;
  };

  const disabledDateFunc = customDisabledDate || defaultDisabledDate;

  return (
    <Form.Item
      initialValue={initialValue}
      label={label}
      name={name}
      rules={rules}
      className={className}
      validateTrigger={validateTrigger}
      noStyle={noStyle}
    >
      <StyledDatePicker
        disabled={disabled}
        placeholder={placeholder}
        size={size}
        value={value ? dayjs(value) : null}
        onBlur={onBlur}
        allowClear={allowClear}
        format={format}
        picker={picker}
        disabledDate={(current: dayjs.Dayjs) => {
          return disabledDateFunc(current) || (disabledDate ? disabledDate(current) : false);
        }}
      />
    </Form.Item>
  );
};
