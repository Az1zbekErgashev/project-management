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
`;
