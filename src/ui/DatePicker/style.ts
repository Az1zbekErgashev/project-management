// styles.ts

import styled from 'styled-components';
import { token } from 'config/token'; // Provide the correct path
import { DatePicker } from 'antd';

export const StyledDatePicker = styled(DatePicker)`
  && {
    height: ${token.inputHeight}px;
    font-size: 0.7777777rem !important;
    color: var(--text-color);
    font-family: var(--default-font);
    font-style: normal;
    font-weight: 500;
    line-height: 1.55556rem;
    width: 100%;

    &::-webkit-input-placeholder {
      font-family: var(--default-font);
      font-size: 0.777777rem !important;
      font-style: normal;
      font-weight: 400;
      line-height: 1.55556rem;
      color: #cacaca;
    }

    input {
      color: var(--text-color, #070707);
      font-family: var(--default-font);
      font-style: normal;
      font-weight: 500;
      line-height: 28px;
      font-size: 0.777777rem !important;
    }
    input::-webkit-input-placeholder {
      font-family: var(--default-font);
      font-size: 0.777777rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.55556rem;
      color: #cacaca;
    }
  }
`;
