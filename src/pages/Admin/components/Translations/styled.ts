import styled from 'styled-components';

export const StyledTranslation = styled.div`
  margin-bottom: 70px !important;

  &.translation-modal,
  &.statuses {
    margin-bottom: 0px !important;
  }
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

  .color-picker {
    input {
      height: 30px !important;
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

    .ant-select-selection-item {
      display: none !important;
    }
  }
`;
