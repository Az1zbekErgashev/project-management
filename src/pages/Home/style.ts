import styled from 'styled-components';

export const StyledHomePage = styled.div`
  height: 100vh;
  width: 100%;
  overflow: hidden; 

  .main-chart {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box; 
    gap: 10px;

    .top-chart {
      width: 100%;
      height: 50%;
      background-color: lightblue;
      border-radius: 8px;
      margin: 5px;
    }

    .big-chart {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      height: 50%;
      width: 100%;
      box-sizing: border-box; 
      gap: 10px;

      .chart-left {
        width: 50%;
        height: 100%;
        background-color: violet;
        border-radius: 8px;

      }

      .chart-right {
        width: 50%;
        height: 100%;
        background-color: gray;
        border-radius: 8px;

      }
    }
  }
`;