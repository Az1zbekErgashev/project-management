import styled from 'styled-components';

export const StyledRequestList = styled.div`
  padding-top: 20px;

  &.deleted-requests {
    padding-top: 0px;
    
    .deleted-request-tab {
      padding-top: 20px !important;
    }
  }

  .admin-tabs {
    border: none !important;
    .ant-tabs-tab {
      background: transparent;
      border-color: transparent;
    }
    .ant-tabs-card > .ant-tabs-nav .ant-tabs-tab-active {
      background: var(--base-color-semi-transparent);
      height: 45px;
      border-radius: 6px !important;
      border-color: transparent;

      .ant-tabs-tab-btn {
        font-size: 0.77778rem;
        line-height: 1.55556rem;
        color: var(--base-color) !important;
      }
    }
    .ant-tabs-card > .ant-tabs-nav {
      .ant-tabs-tab-btn {
        font-size: 0.77778rem;
        line-height: 1.55556rem;
        color: var(--black) !important;
      }
    }
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
`;
