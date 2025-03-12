import { notification } from 'antd';
import { CloseOutlined, CheckOutlined, DeleteOutlined } from '@ant-design/icons';
interface props {
  text: string | React.ReactNode;
  type: 'success' | 'error' | 'delete' | 'info';
}
export function Notification({ text, type }: props) {
  if (type === 'success')
    notification.success({
      message: text,
      placement: 'topRight',
      duration: 3,
      icon: <CheckOutlined />,
    });
  else if (type === 'error')
    notification.error({
      message: text,
      placement: 'topRight',
      duration: 3,
      icon: <CloseOutlined />,
    });
  else if (type === 'delete')
    notification.error({
      message: text,
      placement: 'topRight',
      duration: 3,
      icon: <DeleteOutlined />,
    });
  else if (type === 'info')
    notification.success({
      message: text,
      placement: 'topRight',
      duration: 3,
      icon: <DeleteOutlined />,
    });
}
