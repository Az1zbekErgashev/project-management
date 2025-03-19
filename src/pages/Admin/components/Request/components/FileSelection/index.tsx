import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal } from 'ui';
import { Drawer } from 'antd';
import UploadModal from '../Upload/upload';
import { StyledSelection } from './style';

interface SelectionModalProps {
  onClose: () => void;
}

const Selection: React.FC<SelectionModalProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <StyledSelection>
      <div className="upload-container">
        <h2 className={"choose-option"}>{t('choose_option')}</h2>

        <div className="selection-buttons">
          <Button
            className="upload-btn"
            label={t('upload_file')}
            type="primary"
            onClick={() => setIsUploadModalOpen(true)}
          />
          <Button
            className="input-selection-btn"
            label={t('input_selection')}
            type="primary"
            onClick={() => setIsDrawerOpen(true)}
          />
        </div>

        <Button className="close-btn" label={t('close')} type="primary" onClick={onClose} />
      </div>

      <Modal
        open={isUploadModalOpen}
        onCancel={() => setIsUploadModalOpen(false)}
        footer={null}
        width={600}
      >
        <UploadModal onClose={() => setIsUploadModalOpen(false)} />
      </Modal>

      <Drawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={t('input_selection')}
        placement="right"
      >
        <p>{t('input_selection_content')}</p>
      </Drawer>
    </StyledSelection>
  );
};

export default Selection;
