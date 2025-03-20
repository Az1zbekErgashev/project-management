import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Upload } from 'ui';
import { StyledUpload } from './style';

interface UploadModalProps {
  onClose: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <StyledUpload>
      <div className="upload-container">
        <h2>{t('upload_file')}</h2>
        <p className="file-rules">{t('only_excel_allowed')} (.xlsx, .xls)</p>

        <Upload className="upload-box" />

        <Button className="close-btn" label={t('close')} type="primary" onClick={onClose} />
      </div>
    </StyledUpload>
  );
};

export default UploadModal;
