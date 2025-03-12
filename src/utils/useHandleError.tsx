import { message } from 'antd';
import { smoothScroll } from './globalFunctions';
import { Notification } from 'ui';
import { useTranslation } from 'react-i18next';

interface ErrorProps {
  data: any;
  error: string;
  global?: boolean;
}

message.config({
  maxCount: 5,
  duration: 2,
});

function useHandleError() {
  const { t } = useTranslation();
  const handleError = (data: ErrorProps) => {
    if (data.global && data.error) {
      Notification({ type: 'error', text: t(data.error) });
    }
    smoothScroll('top', 0);
  };

  return [handleError];
}

export default useHandleError;
