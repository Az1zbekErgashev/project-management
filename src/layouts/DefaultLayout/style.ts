import styled from 'styled-components';

export const StyledDefaultLayout = styled.div`
  .content {
    margin-left: 250px;
    margin-bottom: 20px;
    width: calc(100vw - 260px);
    transition: 0.4s;
  }

  .collapsed {
    margin-left: 85px;
    width: calc(100vw - 95px);
  }

  .admin-tabs {
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
`;
