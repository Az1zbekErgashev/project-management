import styled from 'styled-components';

export const StyledRequestStatusPage = styled.div`
  .header-line {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }

  table {
    .ant-table-cell {
      text-align: center !important;
    }
  }

  .color-container {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100%;
  }
  .color-span {
    width: 20px;
    height: 20px;
    border-radius: 100px;
  }

  .color-picker {
  }
`;
