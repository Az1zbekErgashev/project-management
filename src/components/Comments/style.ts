import { styled } from 'styled-components';

export const StyledCommentsSection = styled.div`
  .comments-container {
    max-width: 100%;
    padding: 0;
  }

  .comment-block {
    margin-bottom: 12px !important;
  }

  .comment-item {
    display: flex;
    gap: 8px;
    margin-bottom: 12px !important;
    background-color: #fff;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #e8e8e8;
  }

  .comment-avatar {
    flex-shrink: 0;
    background-color: #e0e0e0;
    border-radius: 50%;
    width: 32px;
    height: 32px;
  }

  .comment-content {
    flex: 1;
  }

  .comment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px !important;
  }

  .comment-username {
    font-size: 14px;
    font-weight: 500;
    margin-right: 8px !important;
    color: #333;
  }

  .comment-time {
    font-size: 12px;
    color: #888;
  }

  .comment-actions {
    display: flex;
    gap: 4px;
  }

  .comment-edit-btn,
  .comment-delete-btn {
    padding: 0;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .comment-text {
    font-size: 14px;
    margin-bottom: 4px !important;
    color: #333;
  }

  .comment-reply-btn {
    font-size: 12px;
    padding: 0;
    height: auto;
    color: #1890ff; 
  }

  .reply-to-text {
    font-size: 12px;
    display: block;
    margin-bottom: 4px !important;
    color: #888;
  }

  .replies-container {
    margin-left: 40px !important;
  }

  .reply-item {
    margin-top: 8px !important;
  }

  .comment-edit-form {
    display: flex;
    gap: 8px;
    margin-top: 8px !important;
  }

  .comment-edit-input {
    flex: 1;
  }

  .reply-form-container {
    width: 100%;
    background-color: #fff;
    padding: 8px 0;
    border-top: none;
  }

  .reply-form-content {
    max-width: 100%;
    margin: 0 !important;
  }

  .reply-form-label {
    display: block;
    margin-bottom: 8px !important;
    font-size: 14px;
  }

  .reply-form-actions {
    display: flex;
    width: 100%;
    gap: 8px;
  }

  .reply-form-input {
    flex: 1;
    border-radius: 4px;
    border: 1px solid #e8e8e8;
    flex-direction: space-between;
    padding: 8px;
    font-size: 14px;
    min-width: 780px;
    height: 60px;

    &::placeholder {
      color: #999;
    }
  }

  .ant-btn {
    &.ant-btn-primary {
      background-color: #000;
      border: none;
      border-radius: 4px;
      padding: 4px 8px;
      display: flex;
      align-items: center;
      justify-content: center;

      .anticon {
        color: #fff;
      }

      &:hover {
        background-color: #333;
      }
    }
  }

  .show-more {
    text-align: center;
    padding-bottom: 10px;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      color: var(--base-color);
    }
  }
`;