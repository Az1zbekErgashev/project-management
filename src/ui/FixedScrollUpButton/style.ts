import styled from 'styled-components';

export const StyledFixedScrollUpButton = styled.button`
  position: relative;
  z-index: 10;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  border: 1px solid #d0d5dd;
  border-radius: 50%;
  color: white;
  right: 30px;
  bottom: 60px;
  font-size: 30px;
  background-color: var(--white);
  &:hover {
    svg path {
      fill: var(--white);
    }
  }

  transition: 0.4s;
  &.invisible {
    opacity: 0;
    pointer-events: none;
  }

  svg {
    fill: var(--base-color);
    width: 18px;
    height: 20px;
  }

  &:hover {
    background-color: var(--base-color);
    svg {
      fill: var(--white);
    }
  }
  @media (max-width: 1024px) {
    right: 12px;
    bottom: 35px;
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
  @media (max-width: 425px) {
    width: 35px;
    height: 35px;
    font-size: 16px;
  }
`;
