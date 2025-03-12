import React, { useEffect, useState } from 'react';
import { Modal } from 'ui/Modal';
import { StyledRedirectModal } from './style';
import { Button } from 'ui/Button';
import useJwt from 'utils/useJwt';
import { motion, AnimatePresence } from 'framer-motion';
import { Spin } from 'antd';
import { useTranslation } from 'react-i18next';

interface props {
  open: boolean;
}

export function RedirectModal({ open }: props) {
  const { remove } = useJwt();
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isVisible) {
        event.preventDefault();
        event.returnValue = '';
        remove();
      }
    };

    if (open) {
      setIsLoading(true);
      window.addEventListener('beforeunload', handleBeforeUnload);

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsLoading(false);
            setIsVisible(false);
            window.removeEventListener('beforeunload', handleBeforeUnload);
            remove();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(timer);
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [open, isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <Modal footer={null} width={400} open={open} closable={false}>
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isLoading ? 1 : 0 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
          >
            <StyledRedirectModal>
              <div className="countdown">
                <div>{isLoading && <Spin size="large" />}</div>
                <p>{countdown}</p>
              </div>

              <div className="content">{t('you_will_be_logged_out')}</div>
              <div className="profile-modal-buttons">
                <Button
                  label={t('logout')}
                  className="btn"
                  type="primary"
                  onClick={() => {
                    remove();
                  }}
                  danger
                />
              </div>
            </StyledRedirectModal>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
}
