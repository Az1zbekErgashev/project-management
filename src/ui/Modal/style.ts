import styled from 'styled-components';
import { Modal } from 'antd';

export const StyledModal = styled.div`
  z-index: ${({ theme }) => theme.antd.zIndexPopupTop} !important;

  .ant-modal-body {
    margin-left: ${({ theme }) => theme.antd.paddingXXL} !important;
  }
`;
