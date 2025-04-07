import styled from 'styled-components';

export const StyledHomePage = styled.div`
  background: rgb(248, 247, 247);
  min-height: 100vh;
  padding: 8px;

  .dashboard-header {
    margin-bottom: 24px;
    padding: 16px 24px;
  }

  .dashboard-title {
    font-size: 28px;
    font-weight: 600;
    margin: 0;
    color: #333;
  }

  .header-stats {
    background: #ffffff;
    padding: 20px;
    margin-bottom: 24px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
  }

  .stats-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 24px;
    padding: 10;
  }

  .stats-section h2 {
    font-size: 16px;
    font-weight: 550;
    color: #333;
    padding: 2px;
    margin: 0;
  }

  .stats-group {
    display: flex;
    flex-direction: row;
    gap: 25px;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .count-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 12px;
    border-radius: 12px;
    transition: all 0.3s ease;
    width: 120px;
    text-align: center;
    background: #ffffff;
    border: 1px solid #e8ecef;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      border-color: #d1d9ff;
    }
  }

  .header-stats > div:first-child .stats-section:nth-child(1) .count-item {
    background: #fef6f5;
    border-left: 4px solid #ff6f61;
    .count-title {
      color: #ff6f61;
    }
    .count-value {
      color: #ff6f61;
    }
  }

  .header-stats > div:first-child .stats-section:nth-child(2) .count-item {
    background: #e6f7ff;
    border-left: 4px solid #13c2c2;
    .count-title {
      color: #13c2c2;
    }
    .count-value {
      color: #13c2c2;
    }
  }

  .header-stats > .stats-section:nth-child(2) .count-item {
    background: #fffbe6;
    border-left: 4px solid #facc15;
    .count-title {
      color: #facc15;
    }
    .count-value {
      color: #facc15;
    }
  }

  .count-title {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 8px;
    text-transform: uppercase;
    text-align: center;
    line-height: 1.2;
    width: 100%;
  }

  .count-value {
    font-size: 24px;
    font-weight: 700;
  }

  .loading {
    font-size: 16px;
    color: #595959;
    text-align: center;
    width: 100%;
  }

  .chart-container {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    border-radius: 12px;
  }

  .ant-card {
    height: 100%;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
  }

  .ant-card-body {
    padding: 24px;
  }

  @media (max-width: 768px) {
    padding: 16px;

    .dashboard-header {
      padding: 12px 16px;
    }

    .dashboard-title {
      font-size: 24px;
    }

    .header-stats {
      padding: 16px;
    }

    .stats-group {
      flex-direction: row;
      gap: 8px;
    }

    .count-item {
      padding: 8px;
      width: 80px;
    }

    .count-title {
      font-size: 12px;
    }

    .count-value {
      font-size: 20px;
    }
  }
`;