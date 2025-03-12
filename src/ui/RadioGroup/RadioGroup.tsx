import React from 'react'
import { Form } from 'antd'
import { Radio } from 'ui'
import { Radio as AntdRadioGroup } from 'antd'
import { RadioChangeEvent } from 'antd/es/radio/interface'

interface StandardOptionProps {
  label: string
  value: number | string
}

export interface RadioGroupProps {
  defaultValue?: Array<string> | string | number
  children?: React.ReactNode
  value?: string | number
  onChange?: (e: RadioChangeEvent) => void
  size?: 'large' | 'middle' | 'small'
  options?: StandardOptionProps[]
  label?: string
  initialValue?: string | number
  direction?: 'vertical' | 'horizontal'
  name?: (string | number)[] | string | number
  disabled?: boolean
  className?: string
  buttonStyle?: 'outline' | 'solid'
  noStyle?: boolean
}

export const RadioGroup = ({
  disabled,
  className,
  defaultValue,
  children,
  value,
  name,
  onChange,
  size,
  options,
  label,
  initialValue,
  direction,
  buttonStyle,
  noStyle,
}: RadioGroupProps) => {
  return (
    <Form.Item
      label={label}
      name={name}
      initialValue={initialValue}
      noStyle={noStyle}
    >
      <AntdRadioGroup.Group
        disabled={disabled}
        className={className}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        size={size}
        buttonStyle={buttonStyle}
      >
        {options
          ? options.map((entry) => {
              return <Radio label={entry.label} value={entry.value} />
            })
          : children}
      </AntdRadioGroup.Group>
    </Form.Item>
  )
}
