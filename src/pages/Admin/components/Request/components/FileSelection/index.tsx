import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal } from 'ui';
import { Drawer, Form } from 'antd';
import UploadModal from '../Upload/upload';
import { StyledSelection } from './style';
import form from 'antd/es/form';
import { UploadOutlined } from '@ant-design/icons';
import { InputSelection } from '../InputSelection';
import { on } from 'events';


interface SelectionModalProps {
  onClose: () => void;
}

const Selection: React.FC<SelectionModalProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [form] = Form.useForm();


  return (
    <StyledSelection>
      <div className="upload-container">
        <h2 className={"choose-option"}>{t('choose_option')}</h2>
        <div className="selection-buttons">
          <Button
            className="upload-btn"
            label={t('upload_file')}
            type="primary"
            icon={<UploadOutlined/>}
            onClick={() => {
              onClose();
              setIsUploadModalOpen(true)
            }}
          />
          <Button
            className="input-selection-btn"
            label={t('input_selection')}
            type="primary"
            onClick={() => {
              onClose();
              setIsDrawerOpen(true)
            }}
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

      <Drawer width={1000} title={t('input_selection')}
        
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        placement="right"
      >
        <InputSelection form={form}
        onClose={onClose}
        />
      </Drawer>
    </StyledSelection>
  );
};

export default Selection;
