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
    gap: 10px;
    margin-bottom: 15px;
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
    margin-bottom: 30px;
  }

  .chart-wrapper {
    width: 100%;
  }

  /* Bar Chart */
  .chart {
    display: flex;
    height: 300px;
    margin-bottom: 20px;
    position: relative;
  }

  .chart-y-axis {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-right: 10px;
    width: 40px;
  }

  .y-axis-label {
    font-size: 12px;
    color: #999;
  }

  .chart-content {
    position: relative;
    flex: 1;
    height: 100%;
  }

  .chart-grid {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 1;
  }

  .grid-line {
    width: 100%;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.05);
  }

  .chart-bars {
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    height: 100%;
    z-index: 2;
  }

  .chart-month {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .bars-group {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    align-items: flex-end;
  }

  .bar {
    width: 15%;
    border-radius: 2px 2px 0 0;
    transition: height 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    transform: scaleY(0);
    transform-origin: bottom;
  }

  .bar.animate {
    transform: scaleY(1);
  }

  .bar:hover {
    opacity: 0.8;
  }

  .bar:hover .bar-tooltip {
    opacity: 1;
    transform: translateY(0);
  }

  .bar-tooltip {
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 3px 6px;
    border-radius: 3px;
    font-size: 11px;
    opacity: 0;
    transition: all 0.2s;
    white-space: nowrap;
    pointer-events: none;
  }

  .month-label {
    margin-top: 10px;
    font-size: 14px;
    color: #666;
  }

  .chart-legend {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .legend-color {
    width: 12px;
    height: 12px;
    border-radius: 2px;
  }

  .legend-label {
    font-size: 12px;
    color: #666;
  }

  .chart-details {
    border-top: 1px solid #eee;
    padding-top: 15px;
  }

  .chart-month-details {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .month-title {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 5px;
  }

  .month-stat {
    font-size: 13px;
  }

  /* Horizontal Bar Chart */
  .horizontal-chart-wrapper {
    width: 100%;
    padding: 10px 0;
  }

  .h-chart-legend {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
  }

  .h-chart {
    position: relative;
    width: 100%;
    margin-top: 30px;
  }

  .h-chart-x-axis {
    position: relative;
    height: 20px;
    margin-bottom: 10px;
  }

  .x-axis-labels {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .x-axis-label {
    position: absolute;
    font-size: 12px;
    color: #999;
    transform: translateX(-50%);
  }

  .x-axis-line {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #eee;
  }

  .h-chart-content {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .h-chart-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .h-chart-label {
    width: 180px;
    font-size: 12px;
    text-align: right;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .h-bars-container {
    flex: 1;
    position: relative;
    height: 20px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .h-bar {
    height: 6px;
    border-radius: 3px;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
  }

  .h-bar.animate {
    transform: scaleX(1);
  }

  .h-bar:hover {
    opacity: 0.8;
  }

  .h-bar:hover .h-bar-tooltip {
    opacity: 1;
    transform: translateY(0);
  }

  .h-bar-tooltip {
    position: absolute;
    top: -25px;
    right: 0;
    transform: translateY(10px);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 3px 6px;
    border-radius: 3px;
    font-size: 11px;
    opacity: 0;
    transition: all 0.2s;
    white-space: nowrap;
    pointer-events: none;
  }

  /* Line Chart */
  .line-chart-wrapper {
    width: 100%;
    padding: 10px 0;
  }

  .line-chart {
    display: flex;
    height: 300px;
    margin-bottom: 20px;
  }

  .line-chart-y-axis {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-right: 10px;
    width: 40px;
  }

  .line-y-axis-label {
    font-size: 12px;
    color: #999;
  }

  .line-chart-content {
    position: relative;
    flex: 1;
    height: 100%;
  }

  .line-chart-grid {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 1;
  }

  .line-grid-line {
    width: 100%;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.05);
  }

  .line-svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }

  .line-path {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    transition: stroke-dashoffset 1.5s ease;
  }

  .line-path.animate {
    stroke-dashoffset: 0;
  }

  .line-area {
    opacity: 0;
    transition: opacity 1s ease;
  }

  .line-area.animate {
    opacity: 1;
  }

  .line-dot {
    opacity: 0;
    transform: scale(0);
    transition:
      opacity 0.3s,
      transform 0.3s;
  }

  .line-dot.animate {
    opacity: 1;
    transform: scale(1);
  }

  .line-dot-pulse {
    opacity: 0.6;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      r: 4;
      opacity: 0.6;
    }
    50% {
      r: 6;
      opacity: 0.3;
    }
    100% {
      r: 4;
      opacity: 0.6;
    }
  }

  .line-chart-x-axis {
    position: absolute;
    bottom: -25px;
    left: 0;
    width: 100%;
    height: 20px;
  }

  .line-x-axis-label {
    position: absolute;
    font-size: 12px;
    color: #666;
    transform: translateX(-50%);
    text-align: center;
  }

  /* Pie Chart */
  .pie-chart-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
  }

  .pie-chart {
    position: relative;
    width: 300px;
    height: 300px;
    margin: 0 auto 30px;
  }

  .pie-svg {
    width: 100%;
    height: 100%;
  }

  .pie-slice {
    transition: transform 0.3s;
    transform-origin: center;
    transform: scale(0);
    cursor: pointer;
  }

  .pie-slice.animate {
    transform: scale(1);
  }

  .pie-slice.selected {
    transform: scale(1.05);
    filter: brightness(1.1);
  }

  .pie-center-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    pointer-events: none;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    width: 50%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .pie-total-label {
    font-size: 14px;
    color: #666;
  }

  .pie-total-value {
    font-size: 24px;
    font-weight: 600;
    color: #333;
  }

  .pie-selected-name {
    font-size: 14px;
    color: #666;
    margin-bottom: 5px;
  }

  .pie-selected-value {
    font-size: 20px;
    font-weight: 600;
    color: #333;
  }

  .pie-selected-percentage {
    font-size: 16px;
    color: #666;
  }

  .pie-legend {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    max-width: 500px;
  }

  .pie-legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 5px 10px;
    border-radius: 4px;
    transition: background-color 0.2s;
    cursor: pointer;
  }

  .pie-legend-item:hover,
  .pie-legend-item.selected {
    background-color: rgba(0, 0, 0, 0.05);
  }

  .legend-value {
    font-weight: 500;
    margin-left: 5px;
  }

  .legend-percentage {
    font-size: 11px;
    color: #999;
    margin-left: 3px;
  }

  /* Yearly Comparison Chart */
  .yearly-chart-wrapper {
    width: 100%;
    padding: 20px 0;
  }

  .yearly-chart-title {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 20px;
    text-align: center;
    color: #333;
  }

  .yearly-chart {
    display: flex;
    height: 350px;
    margin-bottom: 20px;
  }

  .yearly-chart-y-axis {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-right: 10px;
    width: 40px;
  }

  .yearly-y-axis-label {
    font-size: 12px;
    color: #999;
  }

  .yearly-chart-content {
    position: relative;
    flex: 1;
    height: 100%;
  }

  .yearly-chart-grid {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 1;
  }

  .yearly-grid-line {
    width: 100%;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.05);
  }

  .yearly-chart-bars {
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    height: 100%;
    z-index: 2;
  }

  .yearly-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .yearly-bars-container {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    align-items: flex-end;
  }

  .yearly-bar {
    border-radius: 4px 4px 0 0;
    transition: height 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    transform: scaleY(0);
    transform-origin: bottom;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .yearly-bar.animate {
    transform: scaleY(1);
  }

  .yearly-bar:hover {
    filter: brightness(1.1);
  }

  .yearly-bar:hover .yearly-bar-tooltip {
    opacity: 1;
    transform: translateY(0);
  }

  .yearly-bar-tooltip {
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 3px 6px;
    border-radius: 3px;
    font-size: 11px;
    opacity: 0;
    transition: all 0.2s;
    white-space: nowrap;
    pointer-events: none;
  }

  .yearly-label {
    margin-top: 10px;
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }

  .yearly-chart-legend {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }

  .yearly-chart-summary {
    border-top: 1px solid #eee;
    padding-top: 20px;
    margin-top: 20px;
  }

  .yearly-summary-title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 15px;
    color: #333;
  }

  .yearly-summary-content {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
  }

  .yearly-summary-content p {
    margin-bottom: 8px;
  }

  @media (max-width: 768px) {
    .metric-cards,
    .status-tables {
      grid-template-columns: 1fr;
    }

    .chart {
      height: 250px;
    }

    .bar {
      width: 12%;
    }

    .h-chart-label {
      width: 120px;
      font-size: 11px;
    }

    .pie-chart {
      width: 250px;
      height: 250px;
    }

    .yearly-chart {
      height: 300px;
    }
  }
`;
