
import styled from 'styled-components';
import { Tag } from 'antd';

export const StyledIssueManagement = styled.div`
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    .title {
      font-size: 18px;
      font-weight: 500;
      color: #1f2937;
    }
  }

  .form-section {
    background: #f5faff;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 16px;
  }

  .form-row {
    display: flex;
    gap: 16px;
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .form-group {
    flex: 1;
  }

  .button-group {
    display: flex;
    align-items: flex-end;
    gap: 8px;
  }

  .search-button,
  .reset-button {
    padding: 8px 16px;
    border-radius: 4px;
    font-weight: 500;
    transition: all 0.2s ease-in-out;

    &:hover {
      transform: scale(1.05);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }
  }

  .search-button {
    background-color: #1890ff;
    color: #fff;
    border: none;

    &:hover {
      background-color: #40a9ff;
    }
  }

  .reset-button {
    background-color: #e5e7eb;
    color: #4b5563;
    border: none;

    &:hover {
      background-color: #d1d5db;
    }
  }

  .custom-input {
    border-radius: 4px;
    padding: 8px;
  }

  .input-selection-select {
    width: 100%;
    .ant-select-selector {
      border-radius: 4px !important;
      padding: 8px !important;
    }
  }
`;

export const PriorityBadge = styled(Tag)`
  border-radius: 12px;
  padding: 4px 10px;
  font-weight: 500;
  font-size: 12px;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 0.85;
    transform: scale(1.05);
  }
`;
