import React, { TouchEventHandler } from 'react';
import { Button as AntdButton } from 'antd';
import { Link } from 'react-router-dom';

export interface ButtonProps {
  href?: string;
  shape?: 'circle' | 'round';
  type?: 'primary' | 'link' | 'text' | 'default' | 'dashed';
  htmlType?: 'button' | 'reset' | 'submit';
  block?: boolean;
  onClick?: any; //weird class in antd
  size?: 'large' | 'middle' | 'small';
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  onFocus?: React.FocusEventHandler<HTMLSpanElement>;
  onTouchStart?: TouchEventHandler;
  onTouchEnd?: TouchEventHandler;
  label?: React.ReactNode | string;
  danger?: boolean;
  loading?: boolean;
  className?: string;
  disabled?: boolean;
  title?: string;
  icon?: React.ReactNode;
}

export const Button = ({
  disabled,
  label,
  className,
  type,
  shape,
  htmlType,
  onClick,
  block,
  href,
  size,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onTouchStart,
  onTouchEnd,
  danger,
  loading,
  title,
  icon,
}: ButtonProps) => {
  const actualButton = (
    <AntdButton
      disabled={disabled}
      className={className}
      type={type}
      htmlType={htmlType}
      onClick={onClick}
      block={block}
      size={size}
      shape={shape}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      danger={danger}
      loading={loading}
      title={title}
      icon={icon}
    >
      {!!label && <span className="text">{label}</span>}
    </AntdButton>
  );

  return href ? <Link to={href}>{actualButton}</Link> : actualButton;
};
