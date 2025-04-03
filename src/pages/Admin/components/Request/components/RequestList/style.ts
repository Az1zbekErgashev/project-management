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

  .ant-tooltip-placement-top {
    display: none;
  }

  .ant-table-body::-webkit-scrollbar {
    height: 8px; /* Height of horizontal scrollbar */
    width: 8px; /* Width of vertical scrollbar */
  }

  .ant-table-body::-webkit-scrollbar-track {
    background: #f1f1f1; /* Track color */
    border-radius: 10px;
  }

  .ant-table-body::-webkit-scrollbar-thumb {
    background: #888; /* Scrollbar color */
    border-radius: 10px;
  }

  .ant-table-body::-webkit-scrollbar-thumb:hover {
    background: #555; /* Darker color on hover */
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
