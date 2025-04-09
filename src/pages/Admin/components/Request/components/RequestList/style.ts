import styled from 'styled-components';

export const StyledRequestList = styled.div`
  &.deleted-requests {
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
    pointer-events: none; 
    .ant-tooltip-inner {
      background-color: rgba(0, 0, 0, 0.85) !important;
      color: #fff !important;
    }
    .ant-tooltip-arrow {
      &::before {
        background-color: rgba(0, 0, 0, 0.85) !important;
      }
    }
  }

  .ant-table-row {
    .ant-table-cell {
      overflow: visible; 
    }
  }

  .ant-table-body::-webkit-scrollbar {
    height: 8px;
    width: 8px;
  }

  .ant-table-body::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  .ant-table-body::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  .ant-table-body::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  .header-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header-btn {
    display: flex;
  }

  .filter-btn {
    border-radius: 5px;
  }
`;