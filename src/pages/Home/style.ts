import styled from 'styled-components';

export const StyledHomePage = styled.div`
  min-height: 100vh;
  padding: 8px;
  /* Dashboard.css */
  .dashboard-layout {
    min-height: 100vh;
    background-color: #f0f2f5;
  }

  .dashboard-header {
    background-color: white;
    padding: 0 24px;
    display: flex;
    align-items: center;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
    height: 64px;
    position: fixed;
    width: 100%;
    z-index: 1000;
  }

  .dashboard-content {
    padding: 84px 24px 24px;
    margin-top: 0;
  }

  .chart-card {
    position: relative;
    height: 100%;

    .ant-card-body {
      padding: 16px;
      height: 100%;
    }
  }

  .mt-16 {
    margin-top: 16px;
  }

  .year-label {
    position: absolute;
    top: 16px;
    right: 16px;
    text-align: right;

    span {
      font-size: 14px;
      font-weight: bold;
    }

    .metrics {
      margin-top: 8px;
      font-size: 12px;

      div {
        display: flex;
        justify-content: space-between;
        margin-bottom: 4px;

        span:first-child {
          margin-right: 16px;
          font-weight: normal;
        }

        span:last-child {
          font-weight: bold;
        }
      }
    }
  }

  .product-statistic {
    position: relative;

    .product-value {
      position: absolute;
      top: 50%;
      right: 16px;
      transform: translateY(-50%);
      text-align: right;

      .main-value {
        font-size: 24px;
        font-weight: bold;
        color: #333;
      }

      .percentage-up {
        color: #4caf50;
        font-size: 14px;
        margin-bottom: 8px;
      }

      .metrics {
        margin-top: 8px;
        font-size: 12px;

        div {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-bottom: 4px;

          .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin-right: 8px;

            &.purple {
              background-color: #cf7bff;
            }

            &.teal {
              background-color: #37cfba;
            }

            &.red {
              background-color: #ff6b8a;
            }

            &.blue {
              background-color: #4f7cff;
            }
          }
        }
      }

      .description {
        font-size: 10px;
        color: #999;
        margin-top: 8px;
      }
    }
  }

  .sales-card {
    position: relative;

    .center-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;

      .inner-circle {
        width: 80px;
        height: 80px;
        background-color: white;
        border-radius: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .currency {
          font-size: 16px;
          font-weight: bold;
          color: #999;
        }

        .value {
          font-size: 20px;
          font-weight: bold;
          color: #333;
        }
      }
    }

    .total-value {
      position: absolute;
      bottom: 16px;
      left: 16px;

      .value {
        font-size: 18px;
        font-weight: bold;
      }

      .percentage-up {
        color: #4caf50;
        font-size: 14px;
      }
    }
  }

  .finance-metrics {
    display: flex;
    justify-content: center;
    margin-top: 16px;

    div {
      display: flex;
      align-items: center;
      margin: 0 8px;

      .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 4px;

        &.red {
          background-color: #ff6b8a;
        }

        &.purple {
          background-color: #cf7bff;
        }

        &.teal {
          background-color: #37cfba;
        }
      }
    }
  }

  .activity-card {
    position: relative;

    .center-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;

      .activity-value {
        text-align: center;

        .value {
          font-size: 20px;
          font-weight: bold;
          color: #333;
        }

        .percentage-up {
          color: #4caf50;
          font-size: 14px;
        }
      }
    }
  }

  .bottom-charts {
    .bottom-chart-container {
      text-align: center;

      .chart-title {
        font-weight: bold;
        margin-bottom: 8px;
      }

      .percentage-up {
        color: #4caf50;
        font-size: 14px;
        margin-top: 8px;
      }

      .percentage-down {
        color: #ff6b8a;
        font-size: 14px;
        margin-top: 8px;
      }
    }
  }
  .status-card {
    text-align: center;

    .ant-card-body {
      padding: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .circle-indicator {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      border: 2px solid;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 8px;

      span {
        font-size: 16px;
        font-weight: bold;
      }
    }

    .status-title {
      font-size: 14px;
      margin-top: 8px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }
  }
`;
