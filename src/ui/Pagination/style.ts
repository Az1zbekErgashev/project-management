import styled from 'styled-components';

export const StyledPagination = styled.div`
  .custom-pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: var(--white-500);
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;

    position: relative;
    height: 72px;
    border: 1px solid var(--white-table-bg-color);
    border-top: none;
  }

  .pagination-page-size {
    display: flex;
    align-items: center;
    gap: 8px;

    position: absolute;
    left: 24px;
  }

  .ant-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .pagination-page-size span {
    font-size: 14px;
    color: var(--text-color);
  }

  .ant-pagination-next {
    position: absolute;
    right: 16px;
  }

  .ant-select-selector,
  .pagination-btn,
  .ant-select {
    height: 38px !important;
    button {
      color: var(--black);
    }
  }
  .pagination-container {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    padding: 30px 0;
  }

  .ant-pagination-prev {
    position: absolute;
    left: auto;
    right: 108px;
  }
  .pagination-btn {
    margin-right: 8px;
    display: flex;
    padding: 10px 18px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 6px;
    border: 1px solid var(--gray-300);
    background: var(--white);
    font-size: 0.777777rem;
    min-width: 86px;
    min-height: 38px;
    position: relative;
    span {
      font-family: var(--default-font);
      font-style: normal;
      font-weight: 500;
      line-height: 1.1111rem;
    }
  }
  .ant-pagination-item {
    margin: 0 4px;
    font-size: 0.777777rem;
    font-family: var(--default-font);

    a {
      color: var(--text-color) !important;
    }

    &:hover {
      border-radius: 8px !important;
    }
  }
  .ant-pagination-item-active {
    border: none !important;
    background: var(--pagination-color) !important;
    border-radius: 8px !important;
    a {
      color: var(--text-color);
    }
  }
`;
