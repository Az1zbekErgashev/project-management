import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Select, SelectOption, Upload } from 'ui';
import { StyledUpload } from './style';
import useQueryApiClient from 'utils/useQueryApiClient';
interface UploadModalProps {
  onClose: () => void;
  filetState: any;
  setFileState: any;
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose, filetState, setFileState }) => {
  const { t } = useTranslation();
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const handleChangeFile = (file: any) => {
    const realFile =
      file?.file instanceof File
        ? file.file
        : file?.file?.originFileObj instanceof File
          ? file.file.originFileObj
          : null;

    setFileState({ file: realFile, name: file?.file?.name });
  };

  const { data: category } = useQueryApiClient({
    request: {
      url: '/api/request/category',
      method: 'GET',
    },
  });

  const onSubmit = () => {
    if (categoryId === null || undefined || filetState?.file === null || undefined) return;

    const formData = new FormData();
    formData.append('file', filetState.file);

    for (const [key, value] of formData.entries() as any) {
      console.log(key, value);
    }

    postUploadData(formData);
    postUploadData(formData);
  };

  const { appendData: postUploadData, isLoading: isUploadFile } = useQueryApiClient({
    request: {
      url: `/api/request/upload?requestStatusId=${categoryId}`,
      method: 'POST',
      multipart: true,
    },
  });

  return (
    <StyledUpload>
      <div className="upload-container">
        <h2>{t('upload_file')}</h2>
        <p className="file-rules">{t('only_excel_allowed')} (.xlsx, .xls)</p>

        <Upload onChange={handleChangeFile} accept=".xlsx,.xls" className="upload-box">
          <div className="centeredFileName">{filetState?.name}</div>
        </Upload>

        <Select onChange={(x: any) => setCategoryId(x)}>
          {category?.data?.map((item: any, index: number) => (
            <SelectOption key={index} value={item.id}>
              {item.title}
            </SelectOption>
          ))}
        </Select>

        <div className="footer-btn">
          <Button className="close-btn" label={t('close')} type="primary" onClick={onClose} />
          <Button
            loading={isUploadFile}
            disabled={categoryId === undefined || null || filetState?.file === undefined || null ? true : false}
            className="btn"
            label={t('submit')}
            type="primary"
            onClick={onSubmit}
          />
        </div>
      </div>
    </StyledUpload>
  );
};

export default UploadModal;
