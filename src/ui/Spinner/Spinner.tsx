import React from 'react';
import { StyledSpinner } from './styles';

export interface SpinnerProps {
  spinning: boolean;
  className?: string;
  delay?: number;
  children?: React.ReactNode;
  dontRender?: boolean;
  size?: 'small' | 'default' | 'large';
}
export const Spinner = ({ spinning, className, children, dontRender, size='default' }: SpinnerProps) => {
  return (
    <>
      <StyledSpinner spinning={spinning} wrapperClassName={className} size={size}>
        {dontRender && spinning ? <div className="full-spinner"></div> : children}
      </StyledSpinner>
    </>
  );
};
