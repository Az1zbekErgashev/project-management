import styled from 'styled-components';

export const StyledRequestList = styled.div`
  &.deleted-requests {
    margin-bottom: 70px !important;
    padding-top: 0px;

    .deleted-request-tab {
      padding-top: 20px !important;
    }
  }

  .ant-table-container {
    margin-top: 40px !important;
  }

  thead {
    .ant-table-filter-column {
      gap: 20px;
    }
  }

  .ant-tooltip {
    .ant-tooltip-inner {
      background-color: rgba(15, 10, 10, 0.85) !important;
      color: #fff !important;
    }
    .ant-tooltip-arrow {
      &::before {
        background-color: rgba(15, 10, 10, 0.85) !important;
      }
    }
  }

  .header-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header-btn {
    display: flex;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .filter-btn {
    border-radius: 5px;
  }
`;
