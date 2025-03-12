import styled from 'styled-components';
import { token } from 'config/token';
import { Select } from 'antd';

export const StyledSelect = styled(Select)`
  && {
    width: 100%;
    height: ${token.inputHeight}px;
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

  .cv-select .ant-select {
    border-radius: 8px !important;
  }

  .cv-select .ant-select .ant-select-selector {
    border-radius: 8px !important;
    border: 1px solid 8px !important;
    height: 50px !important;
  }
`;
