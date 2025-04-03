import styled from 'styled-components';

export const StyledRequestFilter = styled.div`
  form {
    display: flex;
    align-items: center;
    gap: 5px;
    border-radius: 30px;
    .input-selection {
      width: 100%;
      min-width: 0;
      max-width: 100%;
    }

    .ant-form-item {
      width: 40%;
    }

    .priory {
      width: 35%;
    }
  }
`;
