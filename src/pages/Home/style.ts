import styled from 'styled-components';

export const StyledHomePage = styled.div`
  background:rgb(248, 247, 247);
  min-height: 100vh;
  padding: 8px;
  
  .dashboard-top {
    margin-bottom: 30px;
    background-color: aquamarine;
  }
  .dashboard-header {
    margin-bottom: 24px;
    padding: 16px 24px;
  }

  .dashboard-title {
    font-size: 28px;
    font-weight: 600;
    margin: 0;
  }

  .header-stats {
  background: #ffffff;
  padding: 20px;
  margin-bottom: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 16px;
  border-radius: 4px;
}

.count-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  background:rgb(248, 247, 247);
  border-radius: 6px;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
}


  .count-title {
    font-size: 14px;
    font-weight: 500;
    color: #595959; 
    margin-bottom: 8px;
    text-transform: uppercase;
  }

  .count-value {
    font-size: 24px;
    font-weight: 700;
    color: #1677ff;
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
    border-radius: 8px;
  }

  .ant-card {
    height: 100%; 
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

    .count-item {
      min-width: 80px;
      padding: 8px;
    }

    .count-value {
      font-size: 20px;
    }
  }
`;