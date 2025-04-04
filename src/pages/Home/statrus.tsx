import { Card } from 'antd';
import { StyledHomePage } from './style';

const StatusCard = ({ title, value, color }: any) => {
  return (
    <StyledHomePage>
      <Card className="status-card">
        <div className="circle-indicator" style={{ borderColor: color }}>
          <span>{value}</span>
        </div>
        <div className="status-title">{title}</div>
      </Card>
    </StyledHomePage>
  );
};

export default StatusCard;
