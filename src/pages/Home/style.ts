import styled from 'styled-components';

export const StyledHomePage = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;

  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .dashboard-container {
    max-width: 1200px;
    margin: 0 auto;
    background: white;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);    
  }

  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 24px;
    color: #333;
    text-align: center;
  }

  h2 {
    font-size: 18px;
    font-weight: medium;
    margin-bottom: 16px;
    color: #333;
    text-align: center;
    padding: 10px;
    background: #f0f0f0;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
  }

  h3 {
    font-size: 16px;
    font-weight: bold;
    margin: 0;
  }

  .section {
    margin-bottom: 32px;
    padding: 8px;
  }

  .project-request-summary {
    display: flex;
    gap: 24px;
    margin-bottom: 24px;
    padding-top: 15px;
    .request-item {
      flex: 1;
      background: white;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      text-align: center;
      
      .dept-name {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 8px;
      }

      .dept-percentage {
        font-size: 24px;
        font-weight: bold;
        color: #1890ff;
        margin-bottom: 8px;
      }

      .dept-total {
        font-size: 14px;
        color: #666;
      }
    }
  }

  .department-status {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .department-card {
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding-top: 15px;

    .dept-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid #f0f0f0;

      .dept-total {
        font-size: 14px;
        color: #666;
      }
    }

    .status-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .status-item {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #f0f0f0;

      &:last-child {
        border-bottom: none;
      }

      .status-label {
        font-size: 14px;
      }

      .status-count {
        font-weight: bold;
      }
    }
  }

  .tab-header {
    display: flex;
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 16px;

    .tab {
      padding: 8px 16px;
      cursor: pointer;
      font-weight: 500;

      &.active {
        border-bottom: 2px solid #1890ff;
        color: #1890ff;
      }
    }
  }

  .chart-card {
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 24px;

    .chart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .chart-container {
      height: 400px;
      position: relative;
    }
  }

  @media (max-width: 768px) {
    padding: 16px;

    .project-request-summary {
      flex-direction: column;
      gap: 12px;
    }

    .request-item {
      width: 100%;
    }
  }
`;