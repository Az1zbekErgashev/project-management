import styled from 'styled-components';
import { token } from 'config/token';
import { Form } from 'antd';

export const StyledFormInput = styled(Form.Item)`
  input {
    height: ${token.inputHeight}px;
    font-size: 0.7777777rem;
    color: var(--text-color);
    font-family: var(--default-font);
    font-style: normal;
    font-weight: 500;
    line-height: 1.55556rem;
    width: 100%;

    &::-webkit-input-placeholder {
      font-family: var(--default-font);
      font-size: 0.777777rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.55556rem;
      color: #cacaca;
    }
  }
  .ant-form-item-explain-error {
    font-size: 0.8889rem;
  }

  .ant-input-affix-wrapper {
    padding: 0 10px;
    font-size: 0.777777rem;
  }
`;
