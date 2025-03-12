import styled from 'styled-components';

export const StyledPage = styled.div`
  .admin-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--admin-bg-color);
  }

  .ant-layout-content {
    position: relative;
    min-height: 528px;
    width: 90%;
    padding: 20px 0 20px 0;
    margin: 0 auto;
  }
  &.w-full {
    .ant-layout-content {
      width: 100%;
      padding: 0;
    }
  }

  .logo {
    display: inline-block;
    font-family: var(--primary-font);
    font-size: 1.66667rem;
    line-height: normal;
    font-weight: 700;

    @media screen and (min-width: 1280px) {
      font-size: 2.22222rem;
    }
  }

  .primary-btn {
    background: ${({ theme }) => theme.antd.colorPrimary};
  }

  .admin-primary-btn {
    font-size: 0.77778rem;
    font-family: var(--default-font);
    line-height: 1.11112rem;
    font-weight: 400;

    background: ${({ theme }) => theme.antd.colorBase};
    height: 36px;
    border-radius: 6px;

    &:active,
    &:hover {
      background: var(--white) !important;
      color: ${({ theme }) => theme.antd.colorBase} !important;
      border: 1px solid ${({ theme }) => theme.antd.colorBase};
    }

    &--large {
      min-width: 121px;
      height: 44px;
      padding: 8px 32px;
      font-size: 1rem;
    }
  }

  .admin-default-btn {
    border-radius: 6px;
    min-width: 121px;

    font-family: var(--default-font) !important;
    font-size: 0.77778rem;
    line-height: 1.55556rem;
    font-weight: 400;

    &:active,
    &:hover {
      background: var(--white) !important;
      color: ${({ theme }) => theme.antd.colorBase} !important;
      border: 1px solid ${({ theme }) => theme.antd.colorBase} !important;
    }
  }

  .ant-btn-dangerous:active {
    background: transparent !important;
  }

  .page-title {
    font-family: var(--primary-font);
    font-size: 1.66667rem;
    line-height: normal;
    font-weight: 700;
  }

  .admin-filters {
    padding: 18px 0 70px;

    &__wrapper {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
      gap: 20px;
    }

    .filter-input {
      min-width: 169px;
      width: 250px;

      .ant-form-item-label label {
        font-family: var(--default-font) !important;
        font-size: 1rem !important;
        color: var(--gray-600);
      }
    }

    .ant-select,
    .ant-picker {
      border-radius: 8px;
      height: 44px;
    }
  }

  .admin-table {
    padding: 17px 0;

    .ant-table-thead tr th,
    .ant-table-thead tr td {
      background: var(--white);

      font-family: var(--default-font);
      font-size: 0.77778rem;
      font-weight: 400;
    }

    .ant-table-tbody td {
      font-family: var(--default-font);
      font-size: 0.77778rem;
      font-weight: 400;
    }

    .ant-table-tbody tr:nth-child(even) {
      background-color: var(--white);
    }

    .ant-table-tbody tr:nth-child(odd) {
      background-color: var(--gray-50);
    }

    .pagination-left-button,
    .pagination-right-button {
      border: 1px solid var(--gray-300);
      border-radius: 6px;
      padding: 6px 14px;
      background: var(--white);

      font-family: var(--default-font);
      font-size: 0.77778rem;
      line-height: 1.11112rem;

      transition: all 0.3s;

      &:hover {
        color: var(--accent-color);
        border: 1px solid var(--accent-color);
      }
    }

    .ant-pagination-prev {
      margin-right: auto !important;
    }
    .ant-pagination-next {
      margin-left: auto !important;
    }

    .ant-pagination-item {
      display: flex;
      justify-content: center;
      align-items: center;

      font-family: var(--default-font);
      font-size: 0.77778rem;
      line-height: 1.11112rem;
      color: var(--gray-200);
    }

    .ant-pagination-item-active {
      border: none;
      background: transparent;

      a {
        color: var(--black-tritary) !important;
      }
    }
  }

  .admin-modal-wrapper {
    .ant-modal-header {
      background: var(--base-color) !important;
    }
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

  .admin-base-color-column {
    color: var(--base-color);
  }

  .admin-bold-column div {
    font-weight: 700;
  }
`;
