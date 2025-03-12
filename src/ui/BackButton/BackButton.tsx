import { StyledBackButton } from './style';
import { LeftOutlined } from '@ant-design/icons';

type BackButtonProps = {
  onClick?: any;
  label?: string;
  color?: string;
  icon?: any;
};

export const BackButton = ({ onClick, label, color = 'white', icon = <LeftOutlined /> }: BackButtonProps) => {
  return (
    <StyledBackButton type="link" icon={icon} onClick={onClick} className={`${color}`}>
      {label}
    </StyledBackButton>
  );
};
