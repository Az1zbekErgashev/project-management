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
    padding: 5px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    background-color: white;
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
    padding: 5px;
    border-radius: 8px;
    background-color: white;
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

  /* ONLY CHANGE: Added blue background to All Requests card */
  .metric-card:first-child {
    background-color:rgb(20, 41, 65); 
    border-left: 4px solid #2196f3; 
  }

  .metric-card:second-child {
    background-color:rgb(20, 41, 65); 
    border-left: 4px solid #2196f3; 

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
    gap: 10px;
    transition:
      transform 0.2s,
      box-shadow 0.2s;
  }

  .metric-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .metric-card {
    max-width: 370px;
    height: 180px;
  }

  .metric-title {
    color: #666;
    margin-bottom: 10px !important;
    font-weight: 700;
    font-size: 26px;
  }

  .metric-value {
    font-size: 20px;
    font-weight: 600;
    color: #666;
    margin-bottom: 5px !important;
  }

  .metric-subtitle {
    font-size: 18px;
    color: #666;
    font-weight: bold;
    padding: 6px 12px;
    border-radius: 8px;
    background-color: #f5f5f5; 
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

  .all-requests-table {
    max-width: 370px;
  }

  .status-table:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .table-title {
    font-size: 26px;
    font-weight: 500;
    margin-bottom: 15px;
    font-weight: 700;
    text-align: center;
    color: #666;
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

  .dashboard {
    padding: 20px;

    .dashboard-header {
      margin-bottom: 20px;

      h1 {
        font-size: 24px;
        font-weight: 700;
        margin: 0;
      }
    }

    .metric-cards {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      margin-bottom: 30px;

      .metric-card {
        flex: 1;
        min-width: 200px;
        padding: 20px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        gap: 15px;

        .metric-title {
          color: #666;
          margin-bottom: 10px;
          font-weight: 700;
          font-size: 26px;
        }

        .metric-value {
          font-size: 20px;
          font-weight: 600;
          color: #666;
          margin-bottom: 5px;
        }

        .metric-subtitle {
          font-size: 18px;
          color: #666;
          font-weight: bold;
          padding: 6px 12px;
          border-radius: 8px;
          background-color: #f5f5f5; 
        }
      }
    }

    .section-title {
      font-size: 20px;
      font-weight: 600;
      margin: 30px 0 15px;
    }

    .status-tables {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      margin-bottom: 30px;

      .status-table {
        flex: 1;
        min-width: 250px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        overflow: hidden;

        .table-header {
          display: flex;
          justify-content: space-between;
          padding: 15px;
          background-color: #f5f5f5;
          border-bottom: 1px solid #e0e0e0;

          .table-title {
            font-size: 16px;
            font-weight: 600;
            margin: 0;
          }
        }

        .status-rows {
          padding: 10px 15px;

          .status-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #f0f0f0;

            &:last-child {
              border-bottom: none;
            }

            .status-name {
              font-weight: 500;
            }

            .status-value {
              font-weight: 600;
            }
          }
        }
      }
    }

    .chart-tabs {
      margin-bottom: 20px;

      div {
        display: flex;
        border-bottom: 1px solid #e0e0e0;
      }

      .chart-tab {
        padding: 10px 20px;
        background: none;
        border: none;
        border-bottom: 2px solid transparent;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        color: #666;
        transition: all 0.2s ease;

        &:hover {
          color: #333;
        }

        &.active {
          color: #2196f3;
          border-bottom-color: #2196f3;
        }
      }
    }

    .chart-container {
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 20px;
    }

    .charts-section {
      .charts-title {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 15px;
        color: #333;
      }

      .company-charts {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        margin-bottom: 30px;

        @media (max-width: 768px) {
          flex-direction: column;
        }

        .chart-card {
          flex: 1;
          min-width: 300px;
          background-color: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          overflow: hidden;

          .chart-header {
            padding: 15px;
            background-color: #f9f9f9;
            border-bottom: 1px solid #e0e0e0;

            h4 {
              margin: 0;
              font-size: 16px;
              font-weight: 600;
              color: #333;
            }

            p {
              margin: 5px 0 0;
              font-size: 14px;
              color: #666;
            }
          }

          .chart-content {
            padding: 15px;
          }
        }
      }

      .comparison-table-container {
        margin-bottom: 30px;
        overflow-x: auto;
        background-color: #fff;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

        .comparison-table {
          width: 100%;
          border-collapse: collapse;

          th,
          td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid #e0e0e0;
          }

          th {
            background-color: #f5f5f5;
            font-weight: 600;
            color: #333;
          }

          .status-cell {
            font-weight: 600;
          }

          .total-row {
            font-weight: 600;
            background-color: #f9f9f9;

            td {
              border-top: 2px solid #e0e0e0;
            }
          }
        }
      }

      .comparison-chart {
        margin-bottom: 30px;
        background-color: #fff;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 15px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      }
    }

    .custom-tooltip {
      background-color: #fff;
      padding: 10px;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      .label {
        font-weight: 600;
        margin: 0 0 5px;
      }

      .value {
        margin: 0;
        color: #666;
      }
    }
  }
`;