import styled from 'styled-components';

export const StyledInputSelection = styled.div`
  .form-div {
    display: flex;
    justify-content: space-around;
    gap: 10px;
  }

  .input-div {
    width: 100%;
  }

  .form-content {
    width: 400px;
    display: flex;
    flex-direction: column;
    row-gap: 12px;
  }

  .action-btns {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 30px !important;
  }

  .category {
    width: 100%;
    margin-top: 20px !important;
    .category_input {
      margin-top: 20px !important;
      display: flex;
      gap: 10px;
      .ant-form-item {
        width: 100%;
      }

      button {
        margin-top: 30px !important;
      }
    }
  }

  .date-picker {
    height: 77px;
    display: flex;
    align-items: center;

    .ant-form-item {
      width: 100%;
    }
  }
`;
