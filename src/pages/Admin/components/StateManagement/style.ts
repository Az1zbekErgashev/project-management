
import styled from 'styled-components';
import { Tag } from 'antd';

export const StyledStateManagement = styled.div`
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

  .form-row {
    display: flex;
    gap: 16px;
    margin-bottom: 16px;
    margin-top: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
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

  .submit-button {
    background-color: #1890ff;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    font-weight: 500;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: #40a9ff;
      transform: scale(1.05);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }
  }
`;

export const StateBadge = styled(Tag)`
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

export const ColorDot = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: inline-block;
`;
