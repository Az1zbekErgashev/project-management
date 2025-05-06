import React from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { StyledBurgerButton } from './style';

interface BurgerButtonProps {
  menuOpen?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BurgerButton = ({ menuOpen, className, onClick }: BurgerButtonProps) => {
  return (
    <StyledBurgerButton onClick={onClick} className={className}>
      {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
    </StyledBurgerButton>
  );
};
