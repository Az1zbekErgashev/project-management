import styled from 'styled-components';

export const StyledHomePage = styled.div`
  padding: 20px;
  min-height: 100vh;

  .dashboard {
    margin: 0 auto;
    padding: 20px;
  }

  .dashboard-header {
    margin-bottom: 20px !important;
  }

  .dashboard-header h1 {
    font-size: 24px;
    font-weight: 600;
    color: #333;
    text-align: center;
  }

  /* Section titles */
  .section-title {
    font-size: 18px;
    font-weight: 600;
    margin: 30px 0 15px !important;
    text-align: center;
  }

  /* Metric cards */
  .metric-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    margin-bottom: 30px !important;
  }

  .table-header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-bottom: 20px;
  }

  .metric-card {
    min-width: 250px;
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    transition:
      transform 0.2s,
      box-shadow 0.2s;
  }

  .metric-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .metric-title {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px !important;
  }

  .metric-value {
    font-size: 28px;
    font-weight: 600;
    color: #2196f3;
    margin-bottom: 5px !important;
  }

  .metric-subtitle {
    font-size: 12px;
    color: #999;
  }

  /* Status tables */
  .status-tables {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 30px !important;
  }

  .status-table {
    min-width: 300px;
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition:
      transform 0.2s,
      box-shadow 0.2s;
  }

  .status-table:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .table-title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 15px;
    text-align: center;
  }

  .status-rows {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .status-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .status-name {
    font-size: 14px;
    cursor: pointer;
  }

  .status-value {
    font-size: 14px;
    font-weight: 500;
  }

  /* Chart tabs */
  .chart-tabs {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 15px !important;
    overflow-x: auto;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
  }

  .chart-tab {
    padding: 8px 15px;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    font-size: 14px;
    color: #666;
    white-space: nowrap;
    transition: all 0.2s;
  }

  .chart-tab.active {
    border-bottom: 2px solid #2196f3;
    color: #2196f3;
    font-weight: 500;
  }

  .chart-tab:hover:not(.active) {
    color: #2196f3;
    background-color: rgba(33, 150, 243, 0.05);
  }

  /* Chart type selector */
  .chart-type-selector {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  .chart-type-btn {
    padding: 6px 12px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
    color: #666;
    transition: all 0.2s;
  }

  .chart-type-btn.active {
    background-color: #2196f3;
    color: white;
    border-color: #2196f3;
  }

  .chart-type-btn:hover:not(.active) {
    background-color: #e0e0e0;
  }

  /* Chart container */
  .chart-container {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    margin-bottom: 30px !important;
  }
`;
