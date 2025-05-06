import styled from 'styled-components';
import { Button } from 'antd';

export const StyledBackButton = styled(Button)`
  padding: 0 !important;
  font-family: var(--primary-font);
  font-size: 1.11112rem !important;
  font-weight: 700 !important;

  display: flex;
  align-items: center;

  &:active {
    background: none !important;
  }

  span {
    transition: color 0.3s;
  }

  &.white {
    color: white !important;

    &:hover {
      color: var(--accent-color) !important;
    }
  }

  &.black {
    color: black !important;

    &:hover {
      opacity: 0.7 !important;
    }
  }

  &.green {
    color: var(--accent-color) !important;

    &:hover {
      span {
        color: var(--base-color) !important;
      }
    }
  }
`;
