import { styled } from 'styled-components';

export const StyledCommentsSection = styled.div`
  .comments-container {
    max-width: 600px;
    padding: 16px;
  }

  .comment-block {
    margin-bottom: 16px !important;
  }

  .comment-item {
    display: flex;
    gap: 12px;
    margin-bottom: 16px !important;
    background-color: #f9f9f9;
    padding: 16px;
    border-radius: 8px;
  }

  .comment-avatar {
    flex-shrink: 0;
    background-color: #e0e0e0;
  }

  .comment-content {
    flex: 1;
  }

  .comment-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 8px !important;
  }

  .comment-username {
    font-size: 14px;
    margin-right: 8px !important;
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
    margin-bottom: 8px !important;
  }

  .comment-reply-btn {
    font-size: 12px;
    padding: 0;
    height: auto;
  }

  .reply-to-text {
    font-size: 12px;
    display: block;
    margin-bottom: 4px !important;
    color: #888;
  }

  .replies-container {
    margin-left: 44px !important;
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
    background-color: white;
    border-top: 1px solid #e8e8e8;
    padding: 16px;

    .ant-space-item:first-child {
      width: 100%;
    }
  }

  .reply-form-content {
    max-width: 600px;
    margin: 0 auto !important;
  }

  .reply-form-label {
    display: block;
    margin-bottom: 8px !important;
    font-size: 14px;
  }

  .reply-form-actions {
    display: flex;
    width: 100%;
  }

  .reply-form-input {
    flex: 1;
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
