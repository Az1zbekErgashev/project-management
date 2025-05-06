import styled from 'styled-components';
import { Input } from 'antd';

export const StyledTextarea = styled(Input.TextArea)`
  && {
    height: auto;
    font-size: 0.8889rem;
    color: var(--black, #070707);
    font-family: var(--default-font);
    font-style: normal;
    font-weight: 500;
    line-height: 28px;
    width: 100%;
    resize: none;
    &::-webkit-scrollbar {
      width: 5px;
      border-radius: 8px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      box-shadow: 0px 0px 35px 0px rgba(0, 0, 0, 0.05);
    }
    &::-webkit-scrollbar-track {
      background: rgba(217, 217, 217, 0.15);
      width: 8px;
      border-radius: 8px;
      backdrop-filter: blur(80px);
    }
    &::placeholder {
      font-family: var(--default-font);
      font-size: 0.8888888rem;
      font-style: normal;
      font-weight: 400;
      line-height: 28px;
      color: var(--text-area-color);
    }
  }
`;
