import styled from 'styled-components';
import { Button } from 'antd';

export const StyledIconButton = styled(Button)`
  width: 48px !important;
  height: 48px !important;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  .icon {
    width: 18px;
    height: 18px;
    margin: 0 60px;

    .svg {
      width: 100%;
      height: 100%;
      object-fit: contain;

      path {
        fill: #949494;
        transition: fill 0.3s;
      }
    }
  }

  &:hover {
    .svg {
      path {
        fill: var(--accent-color);
      }
    }
  }

  &.danger {
    .icon {
      .svg {
        path {
          fill: ${({ theme }) => theme.antd.colorIconError};
          transition: fill 0.3s;
        }
      }
    }

    &:hover {
      .svg {
        path {
          fill: ${({ theme }) => theme.antd.colorIconErrorHover};
        }
      }
    }
  }
`;
