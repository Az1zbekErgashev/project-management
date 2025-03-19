import styled from 'styled-components';

export const StyledTranslation = styled.div`
  .header-line {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .filter-items {
    margin-bottom: 30px !important;
    display: flex;
    align-items: center;
    gap: 12px;

    width: 30%;

    .ant-form-item {
      width: 100%;
    }
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .action-form {
    display: flex;
    flex-direction: column;
    row-gap: 30px;

    margin-top: 20px !important;

    .inputs {
      display: flex;
      flex-direction: column;
      row-gap: 15px;
    }
  }

  .action-button {
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 12px;

    margin-top: 20px !important;
  }
`;
