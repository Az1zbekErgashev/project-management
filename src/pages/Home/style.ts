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

  .chart-tabs {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 15px !important;
    overflow-x: auto;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;

    .ant-select {
      width: 150px;
    }
  }

  .select-wrap {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .dashboard-header h1 {
    font-size: 30px;
    font-weight: 600;
    color: #333;
    text-align: center;
  }

  .section-title {
    font-size: 18px;
    font-weight: 600;
    margin: 30px 0 15px !important;
    text-align: center;
  }

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
    min-height: 260px;
    background-color: white;
    border-radius: 8px;
    padding: 24px !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition:
      transform 0.2s,
      box-shadow 0.2s;
  }

  .metric-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .metric-title {
    font-size: 20px !important;
    color: rgb(51 65 85 / 1) !important;
    font-weight: 700;
    margin-bottom: 10px !important;
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

  .status-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .dashboard {
    .dashboard-header {
      margin-bottom: 20px;
      padding: 20px;

      h1 {
        font-size: 50px;
        margin: 0;
        font-weight: bold;
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
        border-radius: 12px;
        --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
        box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);

        .metric-value {
          font-size: 48px;
          font-weight: 700;
          color: #333;
          margin: 8px 0 12px 0 !important;
          height: 40px;
        }
        .metric-subtitle {
          font-weight: 500;
          font-size: 14px;
          color: rgb(100 116 139 / 1);
        }

        .metric-procent {
          font-weight: 700;
          font-size: 24px;
          color: rgb(30 41 59 / 1);
          padding: 12px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background-color: rgb(255 255 255 / 0.3);
        }

        &:first-child {
          background: linear-gradient(90deg, #dfe7ff 0%, #b0c4ff 100%);
        }
        &:nth-child(2) {
          background: linear-gradient(90deg, #cdfbf0 0%, #a0e9dc 100%);
        }
        &:nth-child(3) {
          background: linear-gradient(90deg, #d1f7fe 0%, #a0eafb 100%);
        }
        &:nth-child(4) {
          background: linear-gradient(135deg, #f9e8ff 0%, #e9ccff 50%, #dab8ff 100%);
        }
        &:nth-child(5) {
          background: linear-gradient(135deg, #ffeed2 0%, #ffd9d2 50%, #ffc6bd 100%);
        }
      }
    }

    .section-title {
      font-size: 30px;
      font-weight: 700;
      padding: 20px;
    }

    .status-tables {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      margin-bottom: 30px;

      &.reason-tables {
        flex-direction: column;
      }

      .status-table {
        flex: 1;
        min-width: 250px;
        min-height: 260px;
        background-color: #fff;
        border-radius: 20px;
        --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
        box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
        overflow: hidden;
        padding: 16px;
        background: linear-gradient(90deg, #f9fafc 0%, #edf2f7 100%);
        transition: 0.3s;

        &:first-child {
          background: linear-gradient(90deg, #1e293b 0%, #3b3c5c 50%, #4a4e74 100%);

          .table-header {
            .table-title {
              font-size: 16px;
              font-weight: 600;
              margin: 0;
              color: rgb(255, 255, 255);
            }

            .table-count {
              color: rgb(255, 255, 255);
              background-color: rgb(255 255 255 / 0.2);
            }
          }

          .status-row {
            background-color: rgb(0 0 0 / 0.2) !important;
            color: rgb(255 255 255 / 1) !important;
          }
          .status-name {
            color: rgb(255 255 255 / 1) !important;
          }
        }

        .table-header {
          display: flex;
          justify-content: space-between;

          .table-title {
            font-size: 16px;
            font-weight: 600;

            margin: 0;
            color: rgb(51 65 85 / 1);
          }

          .table-count {
            font-size: 13px;
            color: rgb(30 64 175 / 1);
            font-weight: 600;
            background-color: rgb(219 234 254 / 1);
            padding: 0 8px 0 8px;
            border-radius: 20px;
          }
        }

        .status-rows {
          display: flex;
          flex-direction: column;
          row-gap: 6px;
          .status-row {
            display: flex;
            justify-content: space-between;
            padding: 8px;
            background-color: rgb(255 255 255 / 0.7);
            border-radius: 10px;
            .status-value {
              font-weight: 600;
            }
          }
        }

        .reason-rows {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }

        .status-name {
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .status-value {
          font-size: 14px !important;
          font-weight: 700 !important;
        }

        .color-circle {
          width: 15px;
          height: 15px;
          border-radius: 100px;
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
        font-size: 20px;
        font-weight: 600;
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
            padding: 5px;
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

  .recharts-default-legend {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }

  .ant-tabs-content-holder {
    margin-top: 30px !important;
  }
  .reason-container {
    height: 600px;
    overflow-y: scroll;
    padding: 10px 0;
  }

  .ant-tabs-tab {
    background: none !important;
    border: none !important;
    border-bottom: 2px solid transparent !important;
  }
  .ant-tabs-tab-active {
    background: transparent !important;
    border-bottom: 2px solid #2196f3 !important;
  }

  .ant-tabs-tab-btn {
    font-size: 20px !important;
    color: #666;

    &:hover {
      color: var(--black);
    }
  }

  .second-title {
    margin-bottom: 0px !important;
    padding-bottom: 0px !important;
  }
`;
