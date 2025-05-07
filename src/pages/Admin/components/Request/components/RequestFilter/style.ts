import styled from 'styled-components';

export const StyledRequestFilter = styled.div`
  form {
    display: flex;
    align-items: end;
    gap: 15px;
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
      width: 220px;
      display: flex;
      align-items: center;
      gap: 12px;

      .ant-form-item {
        width: 100%;
      }
    }
  }

  .custom-input {
    height: 50px !important;
  }

  .clear_btn {
    button {
      height: 50px !important;
    }
  }
`;
