import { validateEmail } from './../../utils/globalFunctions';
import { styled } from 'styled-components';

export const StyledCommentsSection = styled.div`
  .comments-section {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    padding: 20px 0;

    .comments-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: #333;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      svg {
        color: #6366f1;
      }
    }

    .comments-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .comment {
      background-color: white;
      border-radius: 0.75rem;
      padding: 1rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      border: 1px solid rgba(0, 0, 0, 0.06);
      transition: all 0.2s ease;
      animation: fadeIn 0.5s ease-out forwards;

      &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      }

      .comment-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.75rem;
      }

      .user-info {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .user-avatar {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 1rem;
      }

      .user-details {
        display: flex;
        flex-direction: column;
      }

      .user-name {
        font-weight: 600;
        font-size: 0.875rem;
        color: #333;
      }

      .comment-date {
        font-size: 0.75rem;
        color: #666;
        margin-top: 0.25rem;
      }

      .comment-text {
        font-size: 0.875rem;
        line-height: 1.5;
        color: #444;
        padding: 0.5rem 0;
        margin-bottom: 0.5rem;
      }

      .comment-actions {
        display: flex;
        gap: 1rem;
        padding-top: 0.5rem;
        border-top: 1px solid rgba(0, 0, 0, 0.05);
      }

      .action-btn {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        background: none;
        border: none;
        font-size: 0.75rem;
        font-weight: 500;
        padding: 0.25rem 0;
        cursor: pointer;
        color: #666;
        transition: all 0.2s ease;

        svg {
          transition: all 0.2s ease;
        }

        &:hover {
          color: #333;

          svg {
            color: var(--base-color);
          }
        }

        &.edit-btn:hover {
          color: var(--base-color);
        }

        &.delete-btn:hover {
          color: #ef4444;

          svg {
            color: #ef4444;
          }
        }
      }

      .edit-area {
        margin-top: 0.5rem !important;

        .edit-textarea {
          width: 100%;
          min-height: 80px;
          padding: 0.75rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 0.5rem;
          font-size: 0.875rem;
          resize: vertical;
          font-family: inherit;

          &:focus {
            outline: none;
            border-color: #6366f1;
            box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
          }
        }

        .edit-buttons {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.75rem !important;
          justify-content: flex-end;
        }
      }
    }

    .btn {
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      font-size: 0.75rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      border: none;

      &.btn-primary {
        background-color: var(--base-color);
        border: 1px solid var(--base-color);
        color: white;
        transition: 0.3s;

        &:hover {
          background-color: var(--white);
          border: 1px solid var(--base-color);
          color: var(--base-color);
        }
      }

      &.btn-secondary {
        background-color: #f3f4f6;
        color: #374151;

        &:hover {
          background-color: #e5e7eb;
        }
      }
    }

    .empty-comments {
      text-align: center;
      padding: 2rem 1rem;
      display: flex;
      align-items: center;
      gap: 20px;

      .empty-icon {
        width: 3rem;
        height: 3rem;
        margin: 0 auto 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(99, 102, 241, 0.1);
        border-radius: 50%;
        color: #6366f1;
      }

      p {
        font-size: 0.875rem;
        color: #666;
        max-width: 20rem;
        margin: 0 auto;
      }
    }

    .comment-input {
      background-color: white;
      border-radius: 0.75rem;
      padding: 1rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      border: 1px solid rgba(0, 0, 0, 0.06);
      margin-top: 20px !important;

      .input-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.75rem;

        .input-avatar {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          background-color: rgba(99, 102, 241, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6366f1;
        }

        .input-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #666;
        }
      }

      .comment-textarea {
        width: 100%;
        min-height: 100px;
        padding: 0.75rem;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 0.5rem;
        font-size: 0.875rem;
        resize: vertical;
        font-family: inherit;
        margin-top: 20px !important;

        &:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
        }

        &::placeholder {
          color: #9ca3af;
        }
      }

      .input-actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 0.75rem !important;

        .submit-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background-color: var(--base-color);
          border: 1px solid var(--base-color) !important;
          color: white;
          border: none;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;

          &:hover {
            background-color: var(--white);
            border: 1px solid var(--base-color);
            color: var(--base-color);
          }

          &.disabled {
            opacity: 0.5;
            cursor: not-allowed;

            &:hover {
              background-color: #6366f1;
            }
          }
        }
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
`;
