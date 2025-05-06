import { styled } from 'styled-components';

export const StyledHistorySection = styled.div`
  margin-top: 40px;

  .history-title {
    font-size: 20px;
    margin-bottom: 16px;
  }

  .history-section {
    padding: 20px 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;

    .history-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: #333;
      position: relative;
      padding-left: 1.5rem;

      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0.75rem;
        height: 0.75rem;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        border-radius: 50%;
      }
    }

    .timeline {
      position: relative;
      padding-left: 2rem;

      &:before {
        content: '';
        position: absolute;
        left: 0.5rem;
        top: 0;
        bottom: 0;
        width: 2px;
        background: linear-gradient(to bottom, #6366f1 0%, rgba(99, 102, 241, 0.2) 100%);
        border-radius: 1px;
      }
    }

    .timeline-item {
      position: relative;
      margin-bottom: 1.5rem;
      animation: fadeIn 0.5s ease-out forwards;
      opacity: 0;
      transform: translateY(10px);

      @for $i from 1 through 10 {
        &:nth-child(#{$i}) {
          animation-delay: #{$i * 0.1}s;
        }
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    .timeline-marker {
      position: absolute;
      left: -2rem;
      top: 0.5rem;
      width: 1rem;
      height: 1rem;
      background-color: white;
      border: 2px solid #6366f1;
      border-radius: 50%;
      z-index: 1;
      box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);

      &:before {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 0.4rem;
        height: 0.4rem;
        background-color: #6366f1;
        border-radius: 50%;
      }
    }

    .timeline-content {
      background-color: white;
      border-radius: 0.75rem;
      padding: 1rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      border: 1px solid rgba(0, 0, 0, 0.06);
      transition: all 0.2s ease;

      &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        transform: translateY(-2px);
      }
    }

    .timeline-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
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

    .timestamp {
      font-size: 0.75rem;
      color: #666;
      margin-top: 0.25rem;
    }

    .action-badge {
      font-size: 0.75rem;
      font-weight: 500;
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      background-color: rgba(99, 102, 241, 0.1);
      color: #6366f1;
    }

    .timeline-message {
      margin-top: 20px !important;
      padding: 0.5rem 0 0 0;
      border-top: 1px solid rgba(0, 0, 0, 0.05);

      p {
        margin: 0;
        font-size: 0.875rem;
        color: #444;
        line-height: 1.5;
      }
    }

    .empty-state {
      text-align: center;
      padding: 2rem 1rem;

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

      h3 {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: #333;
      }

      p {
        font-size: 0.875rem;
        color: #666;
        max-width: 20rem;
        margin: 0 auto;
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

  .center {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 30px 0 0 0 ;
  }
`;
