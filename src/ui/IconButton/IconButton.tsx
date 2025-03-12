import React from 'react';
import { StyledIconButton } from './style';
import SvgSelector from 'assets/icons/SvgSelector';

type IconButtonProps = {
  onClick?: any;
  iconId?: string;
  danger?: boolean;
  disable?: boolean;
};

export const IconButton = ({ onClick, iconId = '', danger = false, disable = false }: IconButtonProps) => {
  return (
    <StyledIconButton
      disabled={disable}
      icon={
        <div className="icon">
          <SvgSelector className="svg" id={iconId} />
        </div>
      }
      danger={danger}
      className={`${danger && 'danger'}`}
      onClick={onClick}
    ></StyledIconButton>
  );
};
