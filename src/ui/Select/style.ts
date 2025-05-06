import styled from 'styled-components';
import { token } from 'config/token';
import { Select } from 'antd';

export const StyledSelect = styled(Select)`
  && {
    width: 100%;
    height: 50px;
    font-size: 0.7777777rem;
    .rc-virtual-list-scrollbar-thumb {
      background-color: ${token.colorBase} !important;
    }
    .ant-select-dropdown {
      z-index: 99;
    }
    .ant-select-selection-item,
    .ant-select-selection-placeholder {
      font-family: var(--default-font);
      font-size: 0.7777777rem !important;
      font-style: normal;
      font-weight: 500;
      line-height: 28px;
    }
    .ant-select-selection-placeholder {
      color: #cacaca !important;
    }
  }
`;
