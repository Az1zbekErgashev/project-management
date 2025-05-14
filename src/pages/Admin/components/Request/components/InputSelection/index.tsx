// InputSelection.tsx
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, DatePicker, Input, Notification, Select, SelectOption, Upload } from 'ui';
import { FormInstance } from 'antd/lib';
import { StyledInputSelection } from './style';
import useQueryApiClient from 'utils/useQueryApiClient';
import { PROJECT_STATUS } from 'utils/consts';
import { UploadOutlined, CloseOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { routes } from 'config/config';
import { CommentsSection } from 'components/Comments';

interface Props {
  form: FormInstance;
  disable: boolean;
  setDisable: any;
  request: any;
  filePath: string | null;
  setFilePath: (value: string | null) => void;
  handleFetchClick: () => void;
}

export function InputSelection({ form, disable, setDisable, request, handleFetchClick }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isDeletedRequests = window.location.pathname.includes('deleted-requests');
  const [fileInfo, setFileInfo] = useState<any>(null);
  const [uploadedUrl, setUploadedUrl] = useState<any>(null);
  const isUploadedRef = useRef(false);

  const { appendData: createData, isLoading } = useQueryApiClient({
    request: {
      url: window.location.pathname.includes('request-detail')
        ? `api/request/update-request?id=${id}`
        : '/api/request/create-request',
      method: window.location.pathname.includes('request-detail') ? 'PUT' : 'POST',
      multipart: true,
    },
    onSuccess() {
      if (!window.location.pathname.includes('request-detail')) {
        Notification({ text: t('request_created_success'), type: 'success' });
      } else {
        Notification({ text: t('request_updated_success'), type: 'success' });
      }
      form.resetFields();
      navigate(-1);
    },
    onError() {
      Notification({ text: t('input_creation_failed'), type: 'error' });
    },
  });

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading' && !isUploadedRef.current) {
      isUploadedRef.current = true;
      setFileInfo({
        name: info.file.name,
        size: (info.file.size / 1024).toFixed(2) + ' KB',
      });

      const formData = new FormData();
      formData.append('id', request?.data?.id);
      formData.append('file', info?.file?.originFileObj);
      uploadFile(formData);
      setUploadedUrl(null);
    }

    if (info.file.status === 'done' || info.file.status === 'error') {
      isUploadedRef.current = false;
    }
  };

  const handleDelete = () => {
    setUploadedUrl(null);
    setFileInfo(null);
    const formData = new FormData();
    formData.append('id', request?.data?.id);
    formData.append('file', '');
    uploadFile(formData);
    Notification({ text: t('file_removed'), type: 'error' });
  };

  const handleSubmit = async () => {
    form
      .validateFields()
      .then((res) => {
        createData(res);
      })
      .catch(() => {
        return;
      });
  };

  const { data: categoryData } = useQueryApiClient({
    request: {
      url: '/api/request/category',
      method: 'GET',
    },
  });

  const { data: processingData, isLoading: isProcessingLoading } = useQueryApiClient({
    request: {
      url: '/api/processingstatus',
      method: 'GET',
    },
  });

  const { appendData: uploadFile } = useQueryApiClient({
    request: {
      url: '/api/request/upload-file',
      method: 'POST',
      multipart: true,
    },
    onSuccess() {
      getFileUrl();
    },
  });

  const { refetch: getFileUrl } = useQueryApiClient({
    request: {
      url: `/api/request/get-uploaded-file?id=${id}`,
      method: 'GET',
      disableOnMount: id ? false : true,
    },
    onSuccess(response) {
      if (response?.data) {
        const url = routes.api.baseUrl + '/' + response?.data;
        setUploadedUrl(url);
      } else setUploadedUrl(null);

      setFileInfo(null);
    },
  });

  return (
    <StyledInputSelection>
      <div className="form-div">
        <div className="form">
          <div className="form-content">
            <div className="form-group">
              <h3>{t('submission_info')}</h3>
              <DatePicker disabled={disable} name="date" label={t('date_created')} />
            </div>
            <div className="form-group">
              <h3>{t('inquiry_details')}</h3>
              <Input name="inquiryType" disabled={disable} label={t('inquiry_type')} />
              <Input name="projectDetails" disabled={disable} label={t('project_details')} />
              <Input name="inquiryField" disabled={disable} label={t('inquiry_field')} />
            </div>

            <div className="form-group">
              <h3>{t('internal_assignment')}</h3>
              <Input name="department" disabled={disable} label={t('department')} />
              <Input name="responsiblePerson" disabled={disable} label={t('responsible_person')} />
            </div>
          </div>
          <div className="form-cont">
            {/* Client Information */}
            <div className="form-group">
              <h3>{t('client_information')}</h3>
              <Input name="clientCompany" disabled={disable} label={t('client_company')} />
              <Input name="client" disabled={disable} label={t('client')} />
              <Input name="contactNumber" disabled={disable} label={t('contact_number')} />
              <Input name="email" disabled={disable} label={t('email')} />
            </div>

            <div className="form-group">
              <h3>{t('status')}</h3>

              <div className="category">
                <Select
                  loading={isProcessingLoading}
                  disabled={disable}
                  label={t('processing_status')}
                  name="processingStatus"
                >
                  {processingData?.data?.items?.map((item: any) => (
                    <SelectOption value={item.id} key={item.id}>
                      {t(item.text)}
                    </SelectOption>
                  ))}
                </Select>
              </div>
              <div className="category">
                <Select
                  disabled={disable}
                  rules={[{ required: true, message: t('field_is_required') }]}
                  label={t('status')}
                  name="status"
                >
                  {PROJECT_STATUS.map((item: any) => (
                    <SelectOption value={item.text} key={item.id}>
                      {t(item.text)}
                    </SelectOption>
                  ))}
                </Select>
              </div>
              <div className="category">
                <Select
                  rules={[{ required: true, message: t('field_is_required') }]}
                  label={t('category')}
                  name="requestStatusId"
                  disabled={disable}
                >
                  {categoryData?.data?.map((item: any) => (
                    <SelectOption value={item.id} key={item.id}>
                      {item.title}
                    </SelectOption>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="text-area">
          <div className="form-group">
            <h3>{t('notes')}</h3>
            {/* <TextArea name="notes" disabled={disable} label={t('notes')} rows={8} /> */}
            {!isDeletedRequests && window.location.pathname.includes('request-detail') && (
              <div className="comments-wrapper">
                <CommentsSection requestId={id!} />
              </div>
            )}
          </div>
          <div>
            {!isDeletedRequests && (
              <div className="action-btns">
                <div className="upload-container">
                  <div className="form-group upload-group">
                    <div className="file-upload-container">
                      {uploadedUrl && (
                        <button className="delete-button" onClick={handleDelete}>
                          <CloseOutlined />
                        </button>
                      )}

                      <Upload onChange={handleChange} showUploadList={false} accept=".pdf,.doc,.docx,.txt">
                        <Button icon={<UploadOutlined />} size="small" label={t('upload_file')} />
                      </Upload>

                      {fileInfo && (
                        <div className="file-info">
                          <span className="file-name">{fileInfo.name}</span>
                          <span className="file-size">({fileInfo.size})</span>
                        </div>
                      )}

                      {uploadedUrl && (
                        <div className="file-link">
                          <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">
                            {fileInfo?.name || t('download_file')}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {window.location.pathname.includes('request-detail') && !disable && (
                  <Button
                    onClick={() => {
                      setDisable(true);
                      handleFetchClick();
                    }}
                    label={t('cancel_to_view_mode')}
                    htmlType="button"
                    loading={isLoading}
                  />
                )}
                {!disable && (
                  <Button
                    label={
                      !window.location.pathname.includes('request-detail') ? t('create_request') : t('save_changes')
                    }
                    type="primary"
                    htmlType="button"
                    onClick={handleSubmit}
                    loading={isLoading}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </StyledInputSelection>
  );
}
